const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   comments: [String]
   });
const Book = mongoose.model('Book', BookSchema);
module.exports = Book;