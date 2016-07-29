/**
 * Errors
 */

/**
 * OperationNotAllowed
 * @constructor
 */
function OperationNotAllowed() {
}
OperationNotAllowed.prototype = Object.create(Error.prototype);
exports.OperationNotAllowed = OperationNotAllowed;

/**
 * InvalidRequest
 * @constructor
 */
function InvalidRequest() {
}
InvalidRequest.prototype = Object.create(Error.prototype);
exports.InvalidRequest = InvalidRequest;
