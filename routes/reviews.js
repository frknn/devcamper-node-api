const express = require('express');
const {
  getReviews
} = require('../controllers/reviews');

// importing course model
const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

// importing advancedResults, protect and authorize middlewares
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');


router.route('/')
  .get(advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description'
  }),
    getReviews
  )

module.exports = router;