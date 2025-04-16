const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: { 
    type: Number, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    enum: ['Food', 'Travel', 'Utilities', 'Entertainment', 'Others'], 
    default: 'Others' 
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
    default: 'expense'
  }
}, { timestamps: true });

transactionSchema.index({ category: 1 });
transactionSchema.index({ date: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);
