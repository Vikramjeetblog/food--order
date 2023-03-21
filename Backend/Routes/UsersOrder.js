const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const Order = require('../Models/Order');

router.post('/UsersOrder', async (req, res) => {
  try {
    // Check if email field is provided in the request body
    if (!req.body.email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if an order with the email already exists in the database
    let order = await Order.findOne({ email: req.body.email });

    if (order) {
      // If an order with the email exists, update it with the new order data
      order.date = req.body.date;
      order.items = req.body.order_data.map(item => ({
        name: item.name,
        quantity: item.quantity,
        size: item.size,
        price: item.price
      }));
    } else {
      // If an order with the email does not exist, create a new order object
      // Find the user who placed the order
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      order = new Order({
        user: user._id,
        email: req.body.email,
        date: req.body.date,
        items: req.body.order_data.map(item => ({
          name: item.name,
          quantity: item.quantity,
          size: item.size,
          price: item.price
        }))
      });
    }

    // Save the order to the database
    await order.save();

    // Send a success response
    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred while placing your order' });
  }
});

module.exports = router;
