var _ = require('lodash');

/**
 * Policy Definitions
 *
 * Equivalent to Policy Administration Point in XACML. See https://en.wikipedia.org/wiki/XACML
 */
function PolicyAccessPoint() {

    this.policyStore = {
        API: {
            browse: {
                resource: 'blog',
                operation: 'browse',
                apply: 'firstApplicable',
                policies: [
                    {
                        pid: 'b9f881c0-5519-11e6-a30f-57c744c3a90e',
                        name: 'public access',
                        effect: 'permit',
                        constraints: {
                            $$roleEquals: 'public'
                        },
                        $$requestSchema: {
                            "id": "public:/API/Browse:request",
                            "type": "object",
                            "properties": {
                                "title": {"type": "string"},
                                "content": {"type": "string"}
                            },
                            "additionalProperties": false
                        },
                        $$responseSchema: {
                            "id": "public:/API/Browse:response",
                            "type": "object",
                            "properties": {
                                "title": {"type": "string"},
                                "content": {"type": "string"}
                            }
                        },
                        filters: {
                            pre: {},
                            post: {}
                        }
                    },
                    {
                        pid: '5f91622c-551b-11e6-88f9-3b29ac028c81',
                        name: 'owner access',
                        effect: 'permit',
                        constraints: {
                            $$roleEquals: 'owner'
                        },
                        requestSchema: {
                            "id": "owner:/API/Browse:request",
                            "type": "object",
                            "properties": {
                                "title": {"type": "string"},
                                "content": {"type": "string"},
                                "status": {
                                    "type": "string",
                                    "enum": ["published", "draft"]
                                },
                                "published_at": {
                                    "type": "string",
                                    "format": "date"
                                }
                            },
                            "additionalProperties": false
                        },
                        responseSchema: {
                            "id": "owner:/API/Browse:response",
                            "type": "object",
                            "properties": {
                                "title": {"type": "string"},
                                "content": {"type": "string"},
                                "author": {"type": "integer"},
                                "status": {
                                    "type": "string",
                                    "enum": ["published", "draft"]
                                },
                                "published_at": {
                                    "type": "string",
                                    "format": "date"
                                },
                                "tags": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            }
                        },
                        filters: {
                            pre: {},
                            post: {}
                        }
                    }
                ]
            },
            publish: {
                resource: 'blog',
                operation: 'publish',
                apply: 'firstApplicable',
                policies: [
                    {
                        pid: '2387bf8a-5523-11e6-b8b0-9bf1561faa25',
                        name: 'public is denied from publishing',
                        effect: 'deny',
                        constraints: {
                            $$roleEquals: 'public'
                        }
                    },
                    {
                        pid: 'bffa09ea-5523-11e6-b002-4381f541a248',
                        name: 'owner is allowed to publish',
                        effect: 'permit',
                        constraints: {
                            $$roleEquals: 'owner',
                            $$dateGreaterThan: {
                                publish_at: '$$currentTime'
                            }
                        },
                        $$requestSchema: {
                            "id": "owner:/API/Publish:request",
                            "type": "object",
                            "properties": {
                                "id": {"type": "string"},
                                "status": {
                                    "type": "string",
                                    "enum": ["published"]
                                },
                                "publish_at": {
                                    "type": "string",
                                    "format": "datetime"
                                }
                            },
                            "additionalProperties": false,
                            "required": ["id", "status", "publish_at"]
                        },
                        $$responseSchema: {
                            "id": "owner:/API/Browse:response",
                            "type": "object",
                            "properties": {
                                "title": {"type": "integer"},
                                "content": {"type": "integer"},
                                "status": {"type": "integer"}
                            }
                        },
                        filters: {
                            pre: {},
                            post: {}
                        }
                    }
                ]
            }
        }
    };
}

/**
 * Get policies for this operation.
 */
PolicyAccessPoint.prototype.findPolicySet = function(resource, operation) {
    return this.policyStore[resource][operation];
};

module.exports = PolicyAccessPoint;