// Modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// DB connection
var db = mongoose.connect('mongodb://localhost/bookAPI');

// Definitions
var app = express();
var port = process.env.PORT || 3000;
var booksRouter = express.Router();

// Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // It will transform the body we get in the req to json

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
    })
    .post(function(req, res) {
        var book = new Book(req.body);

        console.log(book);
        res.send(book);

    });

booksRouter.route('/books/:id')
    .get(function(req, res) {
        Book.findById(req.params.id, function(err, book) {
            if(err) throw err;
            res.json(book);
        });
    });

app.get('/', function(req, res) {
    res.send('Welcome to my api.');
});

// Server
app.listen(port, function () {
    console.log('Gulp is running at http://localhost:' + port);
});
