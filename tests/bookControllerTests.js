var should = require('should');
var sinon  = require('sinon');

describe('Book controller tests:', function() {
    describe('Post', function() {
        it('should not allow an empty title on post', function() {

            // Testing save
            var Book = function(book) {
                this.save = function() {};
            }

            // Creating the request
            var req = {
                body: {
                    author: 'Victor Augusto'
                }
            }

            // Mocking the response
            var res = {
                status: sinon.spy(), // Keep track
                send: sinon.spy()
            }

            // Controller
            var bookController = require('../controllers/bookController')(Book);

            // Post request
            bookController.post(req, res);

            // Assertions
            res.status.calledWith(400).should.equal(true, 'Bad status: ' + res.status.args[0][0]); // Output >> Bad status: <status>
            res.send.calledWith('Title is required').should.equal(true);

        });
    });
});
