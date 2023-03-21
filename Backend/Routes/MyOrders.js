const express = require('express');
const router = express.Router();
const Order = require('../Models/Order');

router.post('/myOrders', async (req, res) => {
  try {
    const data = await Order.findOne({ email: req.body.email });
    res.json(data); // send back the data directly
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
