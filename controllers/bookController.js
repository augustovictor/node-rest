// Revealing module pattern
var bookController = function(Book) {
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
        var book = new Book(req.body);
        book.save();

        res.status(201).send(book); // Added

    };

    return {
        get: get,
        post: post
    }
};

module.exports = bookController;
