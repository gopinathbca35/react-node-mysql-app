const mysql = require('mysql2');

const db = mysql.createConnection({
   host: 'mysql',
   user: 'root',
   password: 'root123',
   database: 'booksdb'
});

function connectWithRetry() {
   db.connect((err) => {
      if (err) {
         console.log('⏳ Waiting for MySQL...');
         setTimeout(connectWithRetry, 5000); // retry every 5 sec
      } else {
         console.log('✅ Connected to MySQL');
      }
   });
}

connectWithRetry();

module.exports = db;
