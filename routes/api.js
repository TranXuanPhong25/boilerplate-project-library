/*
*
*
*       Complete the API routing below
*       
*       
*/
'use strict';
const mongoose = require('mongoose');
const Book = require('../model/Book');
module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      const books = await Book.find({}).select('title commentcount').exec();
      res.json(books);
    })
    
    .post(async function (req, res){
      //response will contain new book object including atleast _id and title
      let title = req.body.title;
      if(!title) {
        res.send('missing required field title');
        return;
      }
      const book = new Book({
        title: title
      });
      await book.save();
      res.json(book);
    })
    
    .delete(async function(req, res){
      //if successful response will be 'complete delete successful'
      await Book.deleteMany({});
      if (await Book.countDocuments() === 0) {
        res.send('complete delete successful');
      }
      
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      if(!mongoose.Types.ObjectId.isValid(bookid)){
        res.send('no book exists');
        return;
      }
      const book = await Book.findOne({_id:  bookid }).exec();
      
      if(!book){
        res.send('no book exists');
        return;
      }
      res.json(book);
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if(!comment) {
        res.send('missing required field comment');
        return;
      }
      if(!mongoose.Types.ObjectId.isValid(bookid)){
        res.send('no book exists');
        return;
      }
      const book = await Book.findById(bookid).exec();
      if(!book){
        res.send('no book exists');
        return;
      }
      book.comments.push(comment);
      book.commentcount = book.comments.length;
      await book.save();
      res.json(book);
    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      if(!mongoose.Types.ObjectId.isValid(bookid)){
        res.send('no book exists');
        return;
      }

      const book = await  Book.findByIdAndDelete(bookid).exec();
      
      if(!book){
        res.send('no book exists');
        return;
      }
      res.send('delete successful');
    });
  
};
