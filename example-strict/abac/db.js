/**
 * Wrapper for database related calls.
 */
var sqlite = require('sqlite3').verbose();

function DB(sqliteFile) {
    var self = this;
    self.db = new sqlite.Database(sqliteFile);
}

DB.prototype.exec = function run(sql, params, done) {
    this.db.all(sql, params || [], done);
};

DB.prototype.close = function() {
    this.db.close();
};

module.exports = DB;
