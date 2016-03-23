var express = require('express');

var routes = function(Book) {
    var bookRouter = express.Router();
    var bookController = require('../controllers/bookController')(Book);

    // Middleware
    bookRouter.use('/:id', bookController.mdFindById);

    // Routes
    bookRouter.route('/')
        .get(bookController.get)
        .post(bookController.post);

    bookRouter.route('/:id')
        .get(bookController.getOne)
        .put(bookController.put)
        .patch(bookController.patch)
        .delete(bookController.remove);

    return bookRouter;
};

module.exports = routes;
