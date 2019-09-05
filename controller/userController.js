const conn = require('../util/connection');

module.exports = {
  create: async user => {
    const { username, password, confirm_password, email } = user;
    const usernameCheckSql = `SELECT * FROM users WHERE name = '${username}'`;
    const userResult = await conn.query(usernameCheckSql);
    console.log('result', userResult);
    if (userResult && userResult.length > 0) {
      console.log('user is taken 123');
      throw 'Username is taken';
    }
    if (password !== confirm_password) {
      throw 'Password confirmation do not match';
    }
    if (userResult && userResult.length === 0) {
      const sql = `INSERT INTO users (name, password, email) VALUES ('${username}', '${password}', '${email}')`;
      console.log('sql', sql);
      const insertResult = await conn.query(sql);
      if (!!insertResult.insertId) {
        const usernameCheckSql = `SELECT * FROM users WHERE id = '${insertResult.insertId}'`;
        const userResult = await conn.query(usernameCheckSql);
        return { id: userResult[0].id, name: userResult[0].name };
      } else {
        return 0;
      }
    }
  },
};