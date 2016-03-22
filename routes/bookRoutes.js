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

    // Middleware
    bookRouter.use('/:id', function(req, res, next) {
        Book.findById(req.params.id, function(err, book) {
            if (err) throw err;

            else if (book) {
                req.book = book;
                next();
            }

            else res.status(404).send('No book found');
        });
    });

    bookRouter.route('/:id')
        .get(function(req, res) {
            res.json(req.book);
        })

        .put(function(req, res) {
            req.book.title  = req.body.title;
            req.book.author = req.body.author;
            req.book.genro  = req.body.genro;
            req.book.read   = req.body.read;

            req.book.save(function(err) {
                if(err) throw err;
                res.json(req.book);
            });
        })

        .patch(function(req, res) {
            if (req.body._id) delete req.body._id;

            for(var param in req.body) {
                req.book[param] = req.body[param];
            }

            req.book.save(function(err) {
                if(err) throw err;
                res.json(req.book);
            });
        });

    return bookRouter;
};

module.exports = routes;
