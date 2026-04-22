const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ✅ IMPORT MODEL (DO NOT RECREATE IT HERE)
const Business = require("../models/Business");

// =========================
// GET BUSINESSES
// =========================
router.get('/', async (req, res) => {
  try {

    const { category, state, lga } = req.query;

    let query = {};

    if (category) query.category = category;
    if (state) query.state = state;
    if (lga) query.lga = lga;

    const businesses = await Business.find(query);

    res.json(businesses);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =========================
// POST BUSINESS (FIXED)
// =========================
router.post('/', async (req, res) => {

  try {

    const business = new Business({
      name: req.body.name,
      category: req.body.category,

      // 🔥 MAIN FIX
      state: req.body.state,
      lga: req.body.lga,
      location: req.body.state,

      phone: req.body.phone
    });

    const newBusiness = await business.save();

    res.status(201).json(newBusiness);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }

});

// =========================
// ADD REVIEW
// =========================
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