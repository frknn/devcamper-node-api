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

const { protect } = require('../middleware/auth');

// importing advResults middleware
const advancedResults = require('../middleware/advancedResults');

// importing bootcamp model
const Bootcamp = require('../models/Bootcamp');

// Include other resource routers
const courseRouter = require('./courses');

// Re-route into other resouce routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, createBootcamp);

router.route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

router.route('/:id/photo')
  .put(protect, bootcampPhotoUpload);

router.route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);

module.exports = router;