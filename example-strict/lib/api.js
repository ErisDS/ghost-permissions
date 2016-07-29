/*
 * API proxies operations on model. All calls here are protected by an authorizer.
 */

var path = require('path'),
    abac = require('../abac'),
    Blog = require('./blog');

/**
 * Actors that can access this API are: {public, owner}. Rules for each operation are
 * presented in the comments.
 * @constructor
 */
function API(subject) {
    this.subject = subject;
    this.blog = new Blog();
}

/**
 * Public can search by {title, status} and see a subset of attributes.
 * Owner can search by all fields and sees all attributes.
 *
 * @param browseRequest e.g., { title: {contains: "a"}, status: "published"}
 */
API.prototype.browse = function(browseRequest) {
    var self = this;

    return abac.authorize(self.subject, browseRequest)
    .then(function(policy) {
        return self.blog.getAll(browseRequest, policy.constraints.$$responseSchema);
    });
};

/**
 * Public can read a model if its 'published' but see a subset of attributes.
 * Owner can read any model and sees all attributes.
 */
API.prototype.read = function(readRequest) {
    throw new Error("Method not implemented");
};

/**
 * Public can not update any model.
 * Owner can update content any model that's not 'published'.
 */
API.prototype.updateContent = function(updateRequest) {
    throw new Error("Method not implemented");
};

/**
 * Public can not publish any model.
 * Owner can publish any model that's not already 'published'.
 */
API.prototype.publish = function(publishRequest) {
    var self = this;

    return abac.authorize(self.subject, publishRequest)
    .then(function(policy) {
        return self.blog.updateStatus(publishRequest, policy.constraints.$$responseSchema);
    });
};

/**
 * Public can not add a new model.
 * Owner can add any model but not all attributes can be added.
 */
API.prototype.add = function() {
    throw new Error("Method not implemented");
};

/**
 * Public can not delete a new model.
 * Owner can delete any model.
 */
API.prototype.delete = function() {
    throw new Error("Method not implemented");
};

exports.createClient = function(subject) {
    return new API(subject);
};

