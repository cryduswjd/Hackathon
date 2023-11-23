"use strict";

const {db} = require("../config/dbconn");

function readyZero() {
    return new Promise((resolve, reject) => {
        const queryData = `INSERT INTO bamboo_stick (click, type) VALUES (NOW(), 0)`;
        db.query(queryData, [], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}

function deleteAll() {
    return new Promise((resolve, reject) => {
        const queryData = `DELETE FROM bamboo_stick`;
        db.query(queryData, [], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}

function class_time() {
    return new Promise((resolve, reject) => {
        const queryData = `SELECT TIMEDIFF(t2.click, t1.click) AS time_diff
        FROM bamboo_stick t1
        JOIN bamboo_stick t2 ON t1.type = 0 AND t2.type = 0 AND t1.id < t2.id
        ORDER BY t1.id
        LIMIT 1;`;
        db.query(queryData, [], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}

function cntForgraph() {
    return new Promise((resolve, reject) => {
        const queryData = `SELECT DATE_FORMAT(click, '%Y-%m-%d %H:%i:00') AS interval_start, COUNT(*) AS count 
                           FROM bamboo_stick GROUP BY UNIX_TIMESTAMP(click) DIV (5 * 60) ORDER BY interval_start;`;
        db.query(queryData, [], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}

module.exports = {
    readyZero,
    class_time,
    cntForgraph
}