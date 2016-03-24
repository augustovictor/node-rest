// Modules
var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');

// DB connection
var db;

if (process.env.ENV == 'Test') {
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
}
else {
    db = mongoose.connect('mongodb://localhost/bookAPI');
}

// Definitions
var app  = express();
var port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); // It will transform the body we get in the req to json

// Models
var Book = require('./models/bookModel');

// Route imports
booksRouter = require('./routes/bookRoutes')(Book);

// Routes
app.use('/api/books'  , booksRouter);


app.get('/', function(req, res) {
    res.send('Welcome to my api.');
});

// Server
app.listen(port, function() {
    console.log('Gulp is running at http://localhost:' + port);
});

module.exports = app; // This allows supertest to execute on app
