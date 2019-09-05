// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
const mysql = require('mysql');
const conn = process.env.DATABASE_URL ? mysql.createConnection(process.env.DATABASE_URL) : mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  timezone: 'UTC'
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  conn.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  conn.end();
});