const express = require('express');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');

const { protect } = require('../middleware/auth');

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
  .post(protect, createCourse)

router.route('/:id')
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse)

module.exports = router;