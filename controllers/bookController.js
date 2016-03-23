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
                if (err) throw err;
                res.json(books);
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
