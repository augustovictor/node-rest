var express = require('express');

var routes = function(Book) {
    var bookRouter = express.Router();

    bookRouter.route('/')
        .get(function(req, res) {
            var query = {};

            if (req.query.genre) {
                query.genre = req.query.genre;
            }

            Book.find(query, function(err, books) {
                    if (err) throw err;
                    res.json(books);
                })
                // res.render('viewName'); // For html
        })
        .post(function(req, res) {
            var book = new Book(req.body);
            book.save();

            res.status(201).send(book);

        });

    bookRouter.route('/:id')
        .get(function(req, res) {
            Book.findById(req.params.id, function(err, book) {
                if (err) throw err;
                res.json(book);
            });
        });

    return bookRouter;
};

module.exports = routes;
