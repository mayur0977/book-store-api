const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const bookModelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  categories: {
    type: [String],
  },
  authors: {
    type: [String],
    required: true,
  },
  publisher: {
    type: String,
  },
  publishedDate: {
    type: String,
  },
  language: {
    type: String,
  },
  pageCount: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  previewLink: {
    type: String,
  },
});

bookModelSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Book = mongoose.model('books', bookModelSchema);

module.exports = Book;
