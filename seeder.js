const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const User = require('./models/User');
const Review = require('./models/Review');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8'));

// Import bootcamp data to DB
const importBootcampData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('Bootcamp data imported successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete bootcamp data
const deleteBootcampData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log('Bootcamp data destroyed!');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Import course data to DB
const importCourseData = async () => {
  try {
    await Course.create(courses);
    console.log('Course data imported successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete course data
const deleteCourseData = async () => {
  try {
    await Course.deleteMany();
    console.log('Course data destroyed!');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Import user data to DB
const importUserData = async () => {
  try {
    await User.create(users);
    console.log('User data imported successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete user data
const deleteUserData = async () => {
  try {
    await User.deleteMany();
    console.log('User data destroyed!');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Import review data to DB
const importReviewData = async () => {
  try {
    await Review.create(reviews);
    console.log('Review data imported successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete review data
const deleteReviewData = async () => {
  try {
    await Review.deleteMany();
    console.log('Review data destroyed!');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-b') {
  if (process.argv[3] === '-i') importBootcampData();
  else if (process.argv[3] === '-d') deleteBootcampData();
}
else if (process.argv[2] === '-c') {
  if (process.argv[3] === '-i') importCourseData();
  else if (process.argv[3] === '-d') deleteCourseData();
}
else if (process.argv[2] === '-u') {
  if (process.argv[3] === '-i') importUserData();
  else if (process.argv[3] === '-d') deleteUserData();
}
else if (process.argv[2] === '-r') {
  if (process.argv[3] === '-i') importReviewData();
  else if (process.argv[3] === '-d') deleteReviewData();
}

