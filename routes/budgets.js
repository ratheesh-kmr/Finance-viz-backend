const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

// GET all budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new budget
router.post('/', async (req, res) => {
  try {
    const budget = new Budget(req.body);
    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update budget
router.put('/:id', async (req, res) => {
  try {
    const updated = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE budget
router.delete('/:id', async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: 'Budget deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;