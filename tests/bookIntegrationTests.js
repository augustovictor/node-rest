var
    // MODULES
    should   = require('should'),
    request  = require('supertest'),
    mongoose = require('mongoose')

    // DEFINITIONS
    app          = require('../app.js'); // This is what supertest is going to use to execute http calls
    Book         = mongoose.model('Book'); // It is possible to pull it in from mongoose because the model Book is being loaded into mongoose in app.js
    agent        = request.agent(app);
;

describe('Book CRUD Test', function() {
    // Our tests
    it('should allow book to be posted and return a read and _id', function(done) {
        var bookPost = {
            title:  'New Book',
            author: 'Victor Augusto',
            genre:  'Tech'
        };

        agent.post('/api/books')
            .send(bookPost)
            .expect(200) // http success status
            .end(function(err, results) {
                // Assertions
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done(); // What is does is tell supertest that this test is done then it can move on to the next thing
            });
    });

    // After all tests are done
    afterEach(function(done) {
        // Clean database
        Book.remove().exec();
        done();
    });
});
