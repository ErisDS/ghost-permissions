var _   = require('lodash');

/**
 * Policy Definitions
 *
 * Equivalent to Policy Administration Point in XACML. See https://en.wikipedia.org/wiki/XACML
 *
 */
function PolicyAccessPoint() {

    this.policyStore = [{
        id: "8a378e2a-460c-11e6-b02b-ebd41fa61ff0",
        name: "publisher can publish a post",
        operationId: "2841abf0-4603-11e6-815a-27ae19cde9fe",
        roles: ["publisher"],
        constraints: {
            "ghost:posts:status": "draft"
        }
    }];
}

/**
 * Get me policies for this operation.
 */
PolicyAccessPoint.prototype.byOperationId = function(operationId) {
    var op =
        _.chain(this.policyStore)
        .find({operationId: operationId})
        .value();

    return op;
};

module.exports = PolicyAccessPoint;