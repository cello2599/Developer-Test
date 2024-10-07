const mysql = require('mysql2');

// Setup MySQL 
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'api_testing'
});

module.exports = db;