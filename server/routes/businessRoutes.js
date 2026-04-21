const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Business = require('../models/Business');
const { SERVICE_CATEGORIES, normalizeCategory } = require('../constants/categories');
const { SERVICE_LOCATIONS, normalizeLocation } = require('../constants/locations');

router.get('/categories', (req, res) => {
  res.json(SERVICE_CATEGORIES);
});

router.get('/locations', (req, res) => {
  res.json(SERVICE_LOCATIONS);
});

// GET /api/businesses - Get all businesses, with optional filters

router.get('/', async (req, res) => {

  try {

    const { category, location } = req.query;

    let query = {};

    if (category) {
      const normalizedCategory = normalizeCategory(category);
      query.category = normalizedCategory ? normalizedCategory.value : new RegExp(category, 'i');
    }

    if (location) {
      const normalizedLocation = normalizeLocation(location);
      query.location = normalizedLocation ? normalizedLocation.label : new RegExp(location, 'i');
    }

    const businesses = await Business.find(query);

    res.json(businesses);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

// POST /api/businesses - Add a business

router.post('/', async (req, res) => {
  const normalizedCategory = normalizeCategory(req.body.category);
  const normalizedLocation = normalizeLocation(req.body.location);

  if (!normalizedCategory) {
    return res.status(400).json({ message: 'Invalid category selected.' });
  }

  if (!normalizedLocation) {
    return res.status(400).json({ message: 'Invalid location selected.' });
  }

  const business = new Business({

    name: req.body.name,

    category: normalizedCategory.value,

    location: normalizedLocation.label,

    phone: req.body.phone

  });

  try {

    const newBusiness = await business.save();

    res.status(201).json(newBusiness);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }

});

router.post('/:id/review', async (req, res) => {
  const { id } = req.params;
  const parsedRating = Number(req.body.rating);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid business ID.' });
  }

  if (!Number.isFinite(parsedRating) || parsedRating < 1 || parsedRating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
  }

  try {
    const business = await Business.findById(id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found.' });
    }

    const totalRating = business.rating * business.numReviews + parsedRating;

    business.numReviews += 1;
    business.rating = Number((totalRating / business.numReviews).toFixed(1));

    const updatedBusiness = await business.save();

    res.json(updatedBusiness);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
