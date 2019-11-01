const express = require('express');
const router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcamps');

// importing advancedResults, protect and authorize middlewares
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// importing bootcamp model
const Bootcamp = require('../models/Bootcamp');

// Include other resource routers
const courseRouter = require('./courses');

// Re-route into other resouce routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router.route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

router.route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

router.route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);

module.exports = router;