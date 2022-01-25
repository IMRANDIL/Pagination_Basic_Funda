const mysql = require('mysql');


//create connection...

const db = mysql.createConnection({
    user: 'admin',
    password: process.env.PASS,
    database: 'Pagination',
    host: 'localhost'
});


//initialize the connection...

db.connect((err) => {
    if (err) throw err;
    console.log(`Db Connected😃`);
});


module.exports = db;