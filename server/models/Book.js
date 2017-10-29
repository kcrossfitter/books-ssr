const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    require: true,
    trim: true
  },
  pages: {
    type: Number,
  },
  price: {
    type: Number
  },
  stores: {
    type: [
      
    ],
    default: null
  }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = { Book };
