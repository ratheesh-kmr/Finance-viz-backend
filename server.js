const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const transactionRoutes = require('./routes/Transactions');
const budgetRoutes = require('./routes/budgets');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
