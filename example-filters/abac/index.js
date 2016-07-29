/*
 * Entry point into ABAC.
 */
var _          = require('lodash'),
    Promise    = require('bluebird'),
    stackTrace = require('stack-trace');

var PolicyDecisionPoint = require('./pdp');

function callerOf(fun) {
    return fun.caller;
}

function callsite(fun) {
    var trace = stackTrace.get(fun || callerOf(callsite));
    var caller = trace[0];
    return {
        typeName: caller.getTypeName(),
        functionName: caller.getFunctionName(),
        methodName: caller.getMethodName()
    };
}

exports.authorize = function(subject, request) {
    var caller = callsite();
    var resource = caller.typeName;
    var operation = caller.methodName;

    var pdp = new PolicyDecisionPoint(subject, resource, operation);
    return pdp.evaluate(request);
};

