/**
 * Wrapper for database related calls.
 */
var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('../perms.db');

function run(sql, params) {
    db.all(sql, params || [], function(error, rows) {
        if(error) {
            console.log(error);
        } else {
            rows.forEach(function(row) {
                console.log(row);
            });
        }
    });
}

db.close();

module.exports = {
    run: run
};