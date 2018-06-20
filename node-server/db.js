const mysql = require('mysql');
let db = null;

module.exports = {
    init: () => {
        db = mysql.createConnection({
            host: "localhost",
            user: "PAT",
            password: "csse4801",
            database: 'PAT'
        });
        console.log('db inited');
        db.connect(function (err) {
            if (err) throw err;
            console.log('db connected');
        });
    },

    insert: (tableName, obj) => {
        if (db == null) {
            throw 'db is null';
        }
        var query = db.query(`INSERT INTO ${tableName} SET ?`, obj, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        console.log(query.sql);
    },

    update: (tableName, obj, key) => {
        return new Promise((res, rej) => {
            if (db == null) {
                throw 'db is null';
            }
            var query = db.query(`UPDATE ${tableName} SET ? WHERE ${key}`, obj, function (err, result) {
                if (err) throw err;
                console.log("1 record updated");
                res();
            });
            console.log(query.sql);
        });
    },

    selectAll: (tableName) => {
        return new Promise((res, rej) => {

            db.query(`SELECT * FROM ${tableName}`, function (err, result, fields) {
                if (err) {
                    rej(err);
                };
                res(result);
            });
        });
    },

    selectOne: (tableName, key) => {
        return new Promise((res, rej) => {
            db.query(`SELECT * FROM ${tableName} WHERE ID='${key}'`, function (err, result, fields) {
                if (err) {
                    rej(err);
                };
                res(result);
            });
        });
    },

    selectWithCondition: (tableName, condition) => {
        return new Promise((res, rej) => {
            var query = db.query(`SELECT * FROM ${tableName} WHERE ${condition}`, function (err, result, fields) {
                if (err) {
                    rej(err);
                };
                res(result);
            });
            console.log(query.sql);
        });
    },

    delete: (tableName, key) => {
        db.query(`DELETE FROM ${tableName} WHERE ID='${key}'`, function (err, result) {
            if (err) {
                throw err;
            };
        });
    },

    customQuery: (query) => {
        return new Promise((res, rej) => {
            db.query(query, function (err, result, fields) {
                if (err) {
                    rej(err);
                };
                res(result);
            });
        });
    },

}