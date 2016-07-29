var Ajv    = require('ajv'),
    should = require('should');

var API    = require('../lib/api'),
    errors = require('../abac/errors');

var ajv = Ajv({
    allErrors: true,
    format: 'full'
});

describe("API", function() {

    describe("Browse", function() {

        describe("as 'public'", function() {
            var subject = {role: 'public'};
            var client = API.createClient(subject);

            it('allows "public" to browse all models but with partial views', function(done) {
                var browseRequest = {
                    title: 'First post'
                };

                client.browse(browseRequest)
                .then(function(reply) {
                    reply.should.containDeep([{title: 'First post'}]);
                })
                .catch(errors.OperationNotAllowed, function(e) {
                    should.not.exist(e);
                })
                .catch(errors.InvalidRequest, function(e) {
                    should.not.exist(e);
                })
                .finally(done);
            });

            it('denies a request that does not conform to schema', function(done) {
                var browseRequest = {
                    author: 1 /* public is not allowed to browse by author*/
                };

                client.browse(browseRequest)
                .catch(errors.OperationNotAllowed, function(e) {
                    should.not.exist(e);
                })
                .catch(errors.InvalidRequest, function(e) {
                    should.exist(e);
                })
                .finally(done);
            });
        });

    });

    describe("Publish", function() {

        describe("as 'public'", function() {
            var subject = {role: 'public'};
            var client = API.createClient(subject);

            it('denies a publish request from "public"', function(done) {
                /* public is not allowed to publish */
                var publishRequest = {
                    id: 1,
                    status: 'published',
                    publish_at: '2016-08-29T10:00:00Z'
                };

                client.publish(publishRequest)
                .catch(errors.OperationNotAllowed, function(e) {
                    // this should fail!
                    should.exist(e);
                })
                .catch(errors.InvalidRequest, function(e) {
                    should.not.exist(e);
                })
                .finally(done);
            });
        });

        describe("as 'owner'", function() {

            var subject = {role: 'owner'};
            var client = API.createClient(subject);

            it('allows a valid publish request from "owner"', function(done) {
                var publishRequest = {
                    id: '1',
                    status: 'published',
                    publish_at: '2016-08-29T10:00:00Z'
                };

                client.publish(publishRequest)
                .catch(errors.OperationNotAllowed, function(e) {
                    should.not.exist(e);
                })
                .catch(errors.InvalidRequest, function(e) {
                    should.not.exist(e);
                })
                .finally(done);
            });
        });
    });

});
