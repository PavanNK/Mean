const conn = require('../util/connection');

module.exports = {
  index: async () => {
    const sql = "SELECT * FROM stationaries;";
    try {
      return await conn.query(sql);
    } catch(err) {
      throw err;
    }
  },
};