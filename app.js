// Modules
var express = require('express');
var mongoose = require('mongoose');

// DB connection
var db = mongoose.connect('mongodb://localhost/bookAPI');

// Definitions
var app = express();
var port = process.env.PORT || 3000;
var booksRouter = express.Router();

// Models
var Book = require('./models/bookModel');

// Routes
app.use('/api', booksRouter);
booksRouter.route('/books')
    .get(function(req, res) {
        var query = {};

        if(req.query.genre) {
            query.genre = req.query.genre;
        }

        Book.find(query, function (err, books) {
            if(err) throw err;
            res.json(books);
        })
        // res.render('viewName'); // For html
    });

booksRouter.route('/books/:id')
    .get(function(req, res) {
        Book.findById(req.params.id, function(err, book) {
            if(err) throw err;
            res.json(book);
        });
    });

// Server
app.listen(port, function () {
    console.log('Gulp is running at http://localhost:' + port);
});
