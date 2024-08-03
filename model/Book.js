const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   commentcount: {
      type: Number,
      default: 0
   },
   comments: [String]
   });
const Book = mongoose.model('Book', BookSchema);
module.exports = Book;