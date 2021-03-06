const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {

  let error = { ...err };
  error.message = err.message;

  // Log to console for developer
  console.log(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found!`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate error for keys or uniques
  if (err.code === 11000) {
    const message = 'Duplicate field value entered!';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose ValidatonError
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  // JsonWebToken Error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Not authorized to access this route';
    error = new ErrorResponse(message, 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error!'
  });
};

module.exports = errorHandler;