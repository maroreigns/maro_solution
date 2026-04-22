const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },

  category: {
    type: String,
    required: true
  },

  // ✅ STATE (MAIN LOCATION)
  state: {
    type: String,
    required: true
  },

  // ✅ LOCAL GOVERNMENT
  lga: {
    type: String,
    required: true
  },

  // ✅ OPTIONAL (fallback only)
  location: {
    type: String
  },

  phone: { type: String, required: true },

  rating: { type: Number, default: 0, min: 0, max: 5 },

  numReviews: { type: Number, default: 0, min: 0 },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Business', businessSchema);