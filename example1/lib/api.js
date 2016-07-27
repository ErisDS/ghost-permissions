/*
 * API proxies operations on model. All calls here are protected by an authorizer.
 */

var authorizer = require('../../lib/abac/authorizer'),
    Model      = require('./model');

/**
 * Actors that can access this API are: {public, owner}. Rules for each operation are
 * presented in the comments.
 * @constructor
 */
function API(subject) {
    this.subject = subject;
    this.model = new Model();
}

/**
 * Public can browse but see a subset of attributes.
 * Owner can browse and sees all attributes.
 */
API.prototype.browse = function() {
    authorizer.can(subject, 'Model', 'browse');
    return this.model.getAll();
};

/**
 * Public can read a model if its 'published' but see a subset of attributes.
 * Owner can read any model and sees all attributes.
 */
API.prototype.read = function(readRequest) {
    authorizer.can(subject, 'Model', 'browse');
    return this.model.getAll();
};

/**
 * Public can not edit any model.
 * Owner can edit any model that's not 'published'.
 */
API.prototype.edit = function() {

};

/**
 * Public can not add a new model.
 * Owner can add any model but not all attributes can be added.
 */
API.prototype.add = function() {

};

/**
 * Public can not delete a new model.
 * Owner can delete any model.
 */
API.prototype.delete = function() {

};

exports.createClient = function(subject) {
    return new API(subject);
};

