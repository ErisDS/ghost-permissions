/* jshint ignore:start */

var _ = require('lodash');

/**
 * Resources meta API. Tells you what's available in the system. The layout is as follows:
 *
 *
 * |__ Resource1
 * |          |__ Operation1
 * |          |__ Operation2
 * |
 * |__ Resource2
 *            |__ Operation1
 *            |__ Operation2
 *
 * Each operation has an endpoint with the route clearly defined. Incoming request body is
 * defined as a JSON Schema. See https://tools.ietf.org/html/draft-zyp-json-schema-04
 *
 * Outgoing responses are defined in a JSON schema too so that clients can expect and parse
 * responses with JSON schema parser tools without having to build them again.
 *
 * @constructor
 */

function Resources() {
    this.publicResources = [];

    var Posts = {
        id: "f8db9c50-4601-11e6-a65a-6fbdc9ec5551",
        name: "Posts",
        metadata: {
            icon: "",
            description: ""
        },
        operations: [
            {
                id: "8f933838-4602-11e6-acd2-77647a177bc2",
                name: "create",
                metadata: {
                    icon: "",
                    description: ""
                },
                route: {
                    method: "post",
                    uri: "/posts"
                },
                schema: {
                    request: {
                        "type": "object",
                        "properties": {
                            "title": {"type": "string"},
                            "slug": {"type": "string"},
                            "markdown": {"type": "string"},
                            "featured": {"type": "boolean"},
                            "tags": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "name": {"type": "string"},
                                        "slug": {"type": "string"}
                                    }
                                }
                            }
                        },
                        "required": []
                    },
                    response: {
                        "type": "object",
                        "properties": {
                            "status": {"type": "integer"},
                            "message": {"type": "string"}
                        }
                    }
                }
            },

            {
                id: "2841abf0-4603-11e6-815a-27ae19cde9fe",
                name: "publish",
                metadata: {
                    icon: "",
                    description: ""
                },
                route: {
                    method: "put",
                    uri: "/posts/:postId/publish"
                },
                schema: {
                    request: {
                        "type": "object",
                        "properties": {
                            "publishDate": {"type": "string", "format": "date-time"}
                        }
                    },
                    response: {
                        "type": "object",
                        "properties": {
                            "status": {"type": "integer"},
                            "message": {"type": "string"}
                        }
                    }
                }
            }
        ]
    };

    this.publicResources.push(Posts);
}

/**
 * Get all resources.
 */
Resources.prototype.getAll = function() {
    return this.publicResources;
};

/**
 * Gives resource and operation info by route.
 */
Resources.prototype.findOperationByRoute = function(method, uri) {
    // loop over all resources but there's only one here so...
    var posts = this.publicResources[0];
    var op =
        _.chain(posts.operations)
        .find(function(operation) {
            return operation.route.method.toUpperCase() == method.toUpperCase() && operation.route.uri == uri;
        })
        .value();

    return op;
};

module.exports = Resources;
