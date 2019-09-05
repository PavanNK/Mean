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
  conn.query("INSERT INTO stationaries (name, unit_price) VALUES ('Pen', '1.5'), ('Pencil', '1.0'), ('Tape', '2.4')",
    function (err, result) {
    if (err) throw err;
    console.log("RECORD inserted!");
  });
  conn.end();
});