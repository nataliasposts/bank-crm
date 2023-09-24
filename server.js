const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  'mongodb+srv://nataliasposts:EHCMOdwye4QL0hWm@bank.tf5nxxs.mongodb.net/userslist?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const User = require('./database/users');
const Transaction = require('./database/transaction');

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.error(`Server started on port ${PORT}`));
