const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {

  let error = { ...err };
  error.message = err.message;

  // Log to console for developer
  console.log(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate error for keys or uniques
  if (err.code === 11000) {
    const message = 'Duplicate field value entered!';
    error = new ErrorResponse(message, 400);
  }

  // ValidatonError - When a required field not entered
  if (err.name === 'ValidationError') {
    let message = 'Please add '
    Object.keys(err.errors).forEach((errField) => {
      message += `${errField}, `
    });
    message = message.slice(0, message.length - 2) + "."
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error!'
  });
};

module.exports = errorHandler;