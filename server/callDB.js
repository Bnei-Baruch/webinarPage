var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./server/webinar.db');

initTable('config');

module.exports = {
    getConfig: getConfig,
    setConfig: setConfig,
    setStatus: setStatus,
    getStatus: getStatus
};

function initTable(name) {
    db.serialize(function() {
        var returnObj = db.get("SELECT name FROM sqlite_master WHERE type='table' AND name=?", [name], function(err, rows) {
            if (err !== null) {
                return err;
            } else if (rows === undefined) {
                return db.run('CREATE TABLE ? ("fieldName" TEXT, "value" TEXT)', [name],
                    function(err) {
                        if (err !== null) {
                            return err;
                        } else {
                            return true;
                        }
                    });
            } else {
                return true;
            }
        });
        return returnObj;
    });
}

function getConfig(callback) {
    db.serialize(function() {
        db.all("SELECT * FROM config", function(err, rows) {
            if (err === null) {
                var rObj = {};
                rows.forEach(function(item) {
                    rObj[item.fieldName] = item.value;
                });
                callback(rObj);
            }
        });
    });
}

function setConfig(dataObj) {
    db.serialize(function() {
        db.run("BEGIN TRANSACTION");
        for (var key in dataObj) {
            (function(key, val) {
                db.get("SELECT * FROM config WHERE fieldName = ?", key, function(err, rows) {
                    if (err !== null || !rows || rows.length > 0)
                        db.run("INSERT INTO config VALUES (?, ?)", [key, val]);
                    else
                        db.run("UPDATE config SET value = ? WHERE fieldName= ?", [val, key]);
                });
            })(key, dataObj[key]);
        }
        db.run("COMMIT");
    });
}



function getStatus(callback) {
    db.serialize(function() {
        db.get("SELECT * FROM config WHERE fieldName = 'status'", function(err, row) {
            if (err === null) {
                var rObj = {};
                rObj[row.fieldName] = row.value;
                callback(rObj);
            }
        });
    });
}

function setStatus(status) {
    db.serialize(function() {
        db.get("SELECT * FROM config WHERE fieldName = 'status'", function(err, rows) {
            if (err !== null || !rows || rows.length > 0)
                db.run("INSERT INTO config VALUES (?, ?)", ["status", status]);
            else
                db.run("UPDATE config SET value = ? WHERE fieldName= ?", [status, "status"]);
        });
    });
}
