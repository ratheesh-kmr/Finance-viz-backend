const mongoose = require('mongoose');

// Regular expression for validating the month in "YYYY-MM" format
const monthRegex = /^\d{4}-\d{2}$/;

const budgetSchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: true 
  },
  budgetAmount: { 
    type: Number, 
    required: true 
  },
  month: { 
    type: String, 
    required: true,
    match: [monthRegex, 'Month must be in the format "YYYY-MM"'] // Validate "YYYY-MM" format
  }
}, { 
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Add a unique index for category and month to prevent duplicates
budgetSchema.index({ category: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('Budget', budgetSchema);
