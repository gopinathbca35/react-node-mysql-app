const mysql = require('mysql2');

const db = mysql.createConnection({
   host: 'mysql-db',
   port: '3306',
   user: 'root',
   password: 'root123',
   database: 'booksdb'
});

db.connect((err) => {
   if (err) {
      console.error('Error connecting to MySQL:', err);
   } else {
      console.log('Connected to MySQL');
   }
});

module.exports = db;
