const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET all transactions (sorted by latest)
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).json({ error: 'Server error while fetching transactions' });
  }
});

// POST: Create a new transaction
router.post('/', async (req, res) => {
  try {
    const { amount, date, description, category, type } = req.body;

    if (!amount || !date || !description || !category || !type) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const transaction = new Transaction({
      amount,
      date,
      description,
      category,
      type
    });

    const saved = await transaction.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating transaction:', error.message);
    res.status(500).json({ error: 'Server error while creating transaction' });
  }
});

// PUT: Update an existing transaction
router.put('/:id', async (req, res) => {
  try {
    const { amount, date, description, category, type } = req.body;

    if (!amount || !date || !description || !category || !type) {
      return res.status(400).json({ error: 'All fields are required for update' });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, date, description, category, type },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error('Error updating transaction:', error.message);
    res.status(500).json({ error: 'Server error while updating transaction' });
  }
});

// DELETE: Remove a transaction
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error.message);
    res.status(500).json({ error: 'Server error while deleting transaction' });
  }
});

module.exports = router;
