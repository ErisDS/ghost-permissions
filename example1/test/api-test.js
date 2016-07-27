var Ajv    = require('ajv'),
    should = require('should');

var API = require('../lib/api');

var ajv = Ajv({
    allErrors: true,
    format: 'full'
});

describe("API", function() {

    describe("as 'public'", function() {

        var subject = {
            role: 'public'
        };
        var client = API.createClient(subject);

        it('allows browsing all models but with partial views', function() {
            console.log(client.browse());
        });

    });

    describe("as 'author'", function() {

    });

});