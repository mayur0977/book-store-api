const Book = require('../models/bookModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Book.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const books = await features.query;

  //Send response
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: books.length,
    data: { books },
  });
});

exports.getBookById = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new AppError('No book found with that ID', 400));
  }

  res.status(200).json({
    status: 'success',
    data: { book },
  });
});

exports.createBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { newBook },
  });
});

exports.updateBookItem = catchAsync(async (req, res, next) => {
  const bookItem = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bookItem) {
    return next(new AppError('No book item found with that ID', 400));
  }
  res.status(200).json({ status: 'success', data: bookItem });
});

exports.deleteBookItem = catchAsync(async (req, res, next) => {
  const bookItem = await bookItem.findByIdAndDelete(req.params.id);
  if (!bookItem) {
    return next(new AppError('No book item found with that ID', 400));
  }
  res.status(200).json({ status: 'success', data: null });
});
