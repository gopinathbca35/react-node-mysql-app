const mysql = require('mysql2');

const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root123',
  database: process.env.DB_NAME || 'booksdb',
};

let db;

function connectWithRetry() {
  db = mysql.createConnection(dbConfig);

  db.connect((err) => {
    if (err) {
      console.log('⏳ Waiting for MySQL...');
      setTimeout(connectWithRetry, 3000); // retry every 3 sec
    } else {
      console.log('✅ Connected to MySQL');
    }
  });
}

connectWithRetry();

module.exports = db;
