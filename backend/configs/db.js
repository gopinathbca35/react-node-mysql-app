const mysql = require('mysql2');

const db = mysql.createConnection({
   host: process.env.DB_HOST || 'mysql',
   user: process.env.DB_USER || 'root',
   password: process.env.DB_PASSWORD || 'root123',
   database: process.env.DB_NAME || 'booksdb'
});

function connectWithRetry() {
   db.connect((err) => {
      if (err) {
         console.log('⏳ Waiting for MySQL...');
         setTimeout(connectWithRetry, 5000);
      } else {
         console.log('✅ Connected to MySQL');
      }
   });
}

connectWithRetry();

module.exports = db;
