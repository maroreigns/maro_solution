require('dotenv').config();

const express = require('express');
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
const cors = require('cors');
const businessRoutes = require('./routes/businessRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const { MONGO_URI } = process.env;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
if (!MONGO_URI) {
  console.error('Missing MONGO_URI environment variable.');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/businesses', businessRoutes);

// Serve static files from client
app.use(express.static('../client'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
