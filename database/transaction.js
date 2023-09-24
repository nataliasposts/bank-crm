const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  sourceId: String,
  targetId: String,
  amount: Number
});

const Transaction = mongoose.model('Transaction', TransactionSchema, 'transactions');

module.exports = Transaction;
