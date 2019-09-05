const mysql = require('mysql');
const conn = process.env.DATABASE_URL ? mysql.createConnection(process.env.DATABASE_URL) : mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: 'mydb',
  timezone: 'UTC'
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  conn.query("CREATE TABLE IF NOT EXISTS stationaries (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), unit_price FLOAT)", function (err, result) {
    if (err) throw err;
    console.log("Stationaries TABLE created");
  });
  conn.query("CREATE TABLE IF NOT EXISTS users (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), password VARCHAR(255), email VARCHAR(255))", function (err, result) {
    if (err) throw err;
    console.log("Users TABLE created");
  });
  conn.query("CREATE TABLE IF NOT EXISTS transactions (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, status VARCHAR(255), users_id INT(11), total FLOAT, updated_at TIMESTAMP, FOREIGN KEY (users_id) REFERENCES users(id))", function (err, result) {
    if (err) throw err;
    console.log("transactions TABLE created");
  });
  conn.query("CREATE TABLE IF NOT EXISTS transaction_items (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, transactions_id INT(11), stationaries_id INT(11), quantity INT(11), subtotal FLOAT, FOREIGN KEY (transactions_id) REFERENCES transactions(id), FOREIGN KEY (stationaries_id) REFERENCES stationaries(id))", function (err, result) {
    if (err) throw err;
    console.log("transaction_items TABLE created");
  });
  conn.end();
});