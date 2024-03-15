const AppError = require('../utils/appError');

const ENVS = {
  dev: 'development',
  prod: 'production',
  none: 'none',
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  // Operational ,trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unknown error: don't leak error details to client
  else {
    //  Log error
    console.error('Error • ', err);

    // Send generic error
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  // const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value : ${value}. please use another value!`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};
const handleJWTError = () => {
  return new AppError('Invalid token. Please login in again.', 401);
};
const handleJWTTokenExpiredError = () => {
  return new AppError('Your token has expired. Please login in again.', 401);
};

module.exports = (err, req, res, next) => {
  console.log('err', err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === ENVS.prod) {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === ENVS.dev) {
    let error = { ...err };
    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    if (err.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (err.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (err.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }
    if (err.name === 'TokenExpiredError') {
      error = handleJWTTokenExpiredError();
    }
    if (err.statusCode === 401) {
      sendErrorProd(err, res);
    } else {
      sendErrorProd(error, res);
    }
  }
};
