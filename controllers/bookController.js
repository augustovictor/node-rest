// Revealing module pattern
var bookController = function(Book) {

    var mdFindById = function(req, res, next) {

        Book.findById(req.params.id, function(err, book) {
            if (err) throw err;

            else if (book) {
                req.book = book;
                next();
            }

            else res.status(404).send('No book found');
        });
    };

    var get = function(req, res) {
        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        Book.find(query, function(err, books) {
                if (err) res.status(500).send(err);
                else {
                    var returnBooks = [];
                    // Here we are getting mongoose models. So we cannot change what those elements are without changing the model
                    books.forEach(function(book, index, array) {
                        var newBook = book.toJSON();

                        /*
                        This is where we add all of our hyperlinks. So if you want to know what else it is possible to do with the object just
                        check the full list
                        */
                        newBook.links = {};

                        // For every book in our return it will send us back the book + a link to get to that individual book
                        newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;

                        returnBooks.push(newBook);
                    });

                    res.json(returnBooks);
                }
            })
            // res.render('viewName'); // For html
    };

    var post = function(req, res) {

        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        }

        else {
            var book = new Book(req.body);
            book.save();

            res.status(201);
            res.send(book); // Added
        };

    };

    var getOne = function(req, res) {
        res.json(req.book);
    };

    var put = function(req, res) {
        req.book.title  = req.body.title;
        req.book.author = req.body.author;
        req.book.genro  = req.body.genro;
        req.book.read   = req.body.read;

        req.book.save(function(err) {
            if(err) res.status(500).send(err);
            else res.json(req.book);
        });
    };

    var patch = function(req, res) {
        if (req.body._id) delete req.body._id;

        for(var param in req.body) {
            req.book[param] = req.body[param];
        }

        req.book.save(function(err) {
            if(err) res.status(500).send(err);
            else res.json(req.book);
        });
    };

    var remove = function(req, res) {
        req.book.remove(function(err) {
            if(err) res.status(500).send(err);
            else res.status(204).send('Removed'); // Removed
        });
    };

    return {
        get: get,
        getOne: getOne,
        post: post,
        put: put,
        patch: patch,
        remove: remove,
        mdFindById: mdFindById
    }
};

module.exports = bookController;
