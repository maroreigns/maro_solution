const mongoose = require('mongoose');
const { SERVICE_CATEGORIES } = require('../constants/categories');
const { SERVICE_LOCATIONS } = require('../constants/locations');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: SERVICE_CATEGORIES.map((category) => category.value)
  },
  location: {
    type: String,
    required: true,
    enum: SERVICE_LOCATIONS.map((location) => location.label)
  },
  phone: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Business', businessSchema);
