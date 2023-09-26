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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const userId = req.query.userId;

    const userTransactions = await Transaction.find({
      $or: [{ sourceId: userId }, { targetId: userId }]
    })
      .skip(skip)
      .limit(limit);

    const allUserTransactions = await Transaction.find({
      $or: [{ sourceId: userId }, { targetId: userId }]
    });

    const sourceSum = allUserTransactions
      .filter((transaction) => transaction.sourceId === userId)
      .reduce((total, current) => total + current.amount, 0);

    const targetSum = allUserTransactions
      .filter((transaction) => transaction.targetId === userId)
      .reduce((total, current) => total + current.amount, 0);

    const finalSum = sourceSum - targetSum;

    res.json({ userTransactions, finalSum });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen('5000', () => console.error(`Server started on port 5000`));
