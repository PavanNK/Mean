const mysql = require('mysql');
const pool = process.env.DATABASE_URL ? mysql.createPool(process.env.DATABASE_URL) : mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: 'mydb',
  timezone: 'UTC'
});

module.exports = {
  query: (sql) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        try {
          connection.query(sql, (err, result, fields) => {
            if (err) throw reject(err);
            resolve(result);
          });
        } finally {
          connection.release();
        }
    });
    });

  }
};

