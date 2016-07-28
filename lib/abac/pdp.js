/**
 * Equivalent to Policy Decision Point in XACML. See https://en.wikipedia.org/wiki/XACML
 */

var Ajv = require('ajv');

function PolicyDecisionPoint() {
    this.ajv = new Ajv();
}

/**
 * Evaluates requests against authorization policies before issuing a decision.
 * The result of decision is boolean. True for "allowed" or "permited". False for "denied".
 *
 * @param subject       who issued this request?
 * @param object        post object
 * @param resource      "Posts" -- basically the "docName"
 * @param operation     object representing "2841abf0-4603-11e6-815a-27ae19cde9fe" in policies.js
 * @returns {boolean} decision after evaluating requests.
 */
PolicyDecisionPoint.prototype.evaluate = function(subject, object, resource, operation, done) {
    var role = subject.role;
    var policy = pap.byOperationId(operation.id);

    // req.body should conform to the schema.
    var valid = this.ajv.validate(operation.schema.request, req.body || {});
    if(!valid) done(new Error("Request is invalid", this.ajv.errors));

    var constraints = policy.constraints;
    // iterate over constraints and verify object satisfies these constraints.

    console.log('subject:', subject);
    console.log('object:', object);
    console.log('resource:', resource);
    console.log('operation:', operation);
    console.log('policy:', policy);

    done(null, {effect: 'allowed'});
};

module.exports = PolicyDecisionPoint;