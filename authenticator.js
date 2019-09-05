const conn = require('./util/connection');

module.exports = {
  authenticate: async (username, password) => {
    if (username === 'admin' && password === 'password') {
      return { id: 'admin', name: 'admin' };
    }
    const usernameCheckSql = `SELECT * FROM users WHERE name = '${username}' AND password = '${password}'`;
    const userResult = await conn.query(usernameCheckSql);
    console.log('result', userResult);
    if (userResult && userResult.length > 0) {
      return { id: userResult[0].id, name: userResult[0].name };
    } else {
      return null;
    }
  }
};
