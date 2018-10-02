const sqlite3 = require('sqlite3').verbose();

(function () {
    module.exports.openConn = (databaseName) => {
        var db = new sqlite3.Database(`${databaseName}.db`, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Connected to the ${databaseName} database.`);
            }
        });
        return db;
    };

    module.exports.createTable = (db, tableName, columns) => {
        var sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;
        db.run(sql, [], function(err) {
            if (err) {
                return console.log(err.message);
              }
              // get the last insert id
              console.log(`Created table`);
        });
    }

    module.exports.insertInto = (db, tableName, columns, values) => {
        var sql = `INSERT INTO ${tableName}(${columns}) VALUES(${values});`;
        db.run(sql, [], function(err) {
            if (err) {
                return console.log(err.message);
              }
              // get the last insert id
              console.log(`A row has been inserted with rowid ${this.lastID}`);
        });
    }

    module.exports.selectAll = (db, tableName, columns, callback) => {
        var sql = `SELECT ${columns} FROM ${tableName}`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error(err);
            } else {
                var data = [];
                rows.forEach(row => {
                    data.push(row);
                });
                var m = {
                    'message': 'selectResult',
                    'table': tableName,
                    'data': data
                }
                callback(m);
            }
        });
    }

    module.exports.select = (db, tableName, columns, condition, callback) => {
        var ret, sql = `SELECT ${columns} FROM ${tableName} WHERE ${condition}`;
        db.get(sql, [], (err, row) => {
            if (err) {
                console.error(err);
            } else {
                var data = [];
                data.push(row);
                var m = {
                    'message': 'selectResult',
                    'table': tableName,
                    'data': data
                }
                callback(m);
            }
        });
        return ret;
    }

    module.exports.update = (db, tableName, updates, condition) => {
        var sql = `UPDATE ${tableName} SET ${updates} WHERE ${condition}`;
        db.run(sql);
    }

    module.exports.closeConn = (db) => {
        db.close((err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Close the database connection.');
            }
        });
    };

}());