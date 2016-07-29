/**
 * Equivalent to Policy Decision Point in XACML. See https://en.wikipedia.org/wiki/XACML
 */

var _       = require('lodash'),
    Ajv     = require('ajv'),
    Promise = require('bluebird');

var errors            = require('./errors'),
    PolicyAccessPoint = require('./pap');

/**
 * Decision engine.
 * @param subject
 * @param resource
 * @param operation
 * @param object
 * @constructor
 */
function PolicyDecisionPoint(subject, resource, operation, object) {
    this.pap = new PolicyAccessPoint();
    this.ajv = new Ajv();

    this.subject = subject;
    this.resource = resource;
    this.operation = operation;
    this.object = object;
}

/**
 * Evaluates requests against authorization policies before issuing a decision.
 * The result of decision is boolean. True for "allowed" or "permited". False for "denied".
 * @param request Incoming request object
 */
PolicyDecisionPoint.prototype.evaluate = Promise.method(function(request) {
    // lookup policies for requested operation.
    var policySet = this.pap.findPolicySet(this.resource, this.operation);

    // We only have 'firstApplicable' evaluation. The first policy to match the constraints is evaluated.
    // policies are evaluated from most strict to least strict
    if(policySet.apply == 'firstApplicable') {
        return this.evaluateFirstApplicable(policySet, request);
    }
});

/**
 * Decide based on first applicable policy.
 */
PolicyDecisionPoint.prototype.evaluateFirstApplicable = Promise.method(function(policySet, request) {
    // 1. Is the caller allowed to make this call.
    var role = this.subject.role;
    var policy = _.find(policySet.policies, {constraints: {$$roleEquals: role}});
    if(!policy) {
        throw new errors.OperationNotAllowed("No matching policy found");
    }

    if(policy.effect == 'deny') {
        throw new errors.OperationNotAllowed("Request denied due to insufficient priviliges.");
    }

    // So we found a matching policy for given {subject, resource, operation} combination

    // 2. Did the caller send valid arguments?
    var valid = this.ajv.validate(policy.constraints.$$requestSchema || {}, request || {});
    if(!valid) throw new errors.InvalidRequest("Request is invalid", this.ajv.errors);

    return policy;
});

module.exports = PolicyDecisionPoint;