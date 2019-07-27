var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Setel@123',
    database: 'my_schema'
});
module.exports = connection;
