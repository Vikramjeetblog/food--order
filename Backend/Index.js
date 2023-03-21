const express = require('express');
const app = express();
const port = 5000;
const MogoDB = require('./db');
const cors = require('cors');

MogoDB();

// Allow requests from localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/FoodData'));
app.use('/api', require('./Routes/UsersOrder'));
app.use('/api',require('./Routes/MyOrders'));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
