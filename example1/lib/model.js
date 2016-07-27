/*
 * Model is an in-memory data store which reads and writes blog posts.
 * NOTE: Calls here are unprotected.
 */

var _ = require('lodash');

/**
 * Sample resource with operations.
 * @constructor
 */
function Model() {
    this.posts = [
        {
            id: '1',
            title: 'First post',
            content: 'First post content',
            status: 'published',
            tags: ['a', 'b'],
            author: 1,
            created_at: '2016-07-26T18:25:43.511Z',
            published_at: '2016-07-26T19:13:24.511Z',
            reviewer: 214,
            category: 'sales'
        },
        {
            id: '2',
            title: 'Second post',
            content: 'Second post content',
            status: 'draft',
            tags: ['c', 'd'],
            author: 5,
            created_at: '2016-07-26T18:25:43.511Z',
            published_at: null,
            reviewer: null,
            category: 'food'
        }
    ];
}

/**
 * Browser operation
 */
Model.prototype.getAll = function() {
    return this.posts;
};

/**
 * Get by id
 */
Model.prototype.getById = function(id) {
    return _.find(this.posts, {id: id});
};

/**
 * Edit a post.
 */
Model.prototype.update = function(id, title, content) {
    var object = this.getById(id);
    object.title = title;
    object.content = content;
    return object;
};

/**
 * Edit a post.
 */
Model.prototype.destroy = function(id) {
    this.posts = _.reject(this.posts, {id: id});
    return this.posts;
};

module.exports = Model;