const express = require('express');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');

const { protect, authorize } = require('../middleware/auth');

// importing course model
const Course = require('../models/Course');

// importing advResults middleware
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });


router.route('/')
  .get(advancedResults(Course, {
    path: 'bootcamp',
    select: 'name description'
  }),
    getCourses
  )
  .post(protect, authorize('publisher', 'admin'), createCourse)

router.route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admin'), updateCourse)
  .delete(protect, authorize('publisher', 'admin'), deleteCourse)

module.exports = router;