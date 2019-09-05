const conn = require('../util/connection');
const moment = require('moment-timezone');

module.exports = {
  create: async (user, stationaries, storeStationaries) => {
    const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    let totalCost = 0;
    for (const [key, value] of Object.entries(stationaries)) {
      totalCost += Number.parseInt(value) * storeStationaries[key]['unit_price'];
    }
    const transSql = `INSERT INTO transactions (status, users_id, updated_at, total) VALUES ('submitted', '${user.id}', '${updatedAt}', '${totalCost}')`;
    const id = await conn.query(transSql);
    const insertId = id.insertId;
    let sql = `INSERT INTO transaction_items (transactions_id, stationaries_id, quantity, subtotal) VALUES`;

    for (let stationary of Object.keys(stationaries)) {
      let subtotal = Number.parseInt(stationaries[stationary]) * storeStationaries[stationary]['unit_price'];
      sql += `('${insertId}', '${stationary}', '${stationaries[stationary]}', '${subtotal}'),`;
    }
    sql = sql.slice(0, -1);
    await conn.query(sql);
    return true;
  },

  index: async (user) => {
    const adminSql = 'SELECT *, transaction_items.id as tid FROM transactions INNER JOIN transaction_items ON transactions.id = transaction_items.transactions_id \
      INNER JOIN stationaries ON stationaries.id = transaction_items.stationaries_id ORDER BY transactions.id';
    const sql = `SELECT *, transaction_items.id as tid FROM transactions INNER JOIN transaction_items ON transactions.id = transaction_items.transactions_id \
      INNER JOIN stationaries ON stationaries.id = transaction_items.stationaries_id WHERE users_id = ${user.id} ORDER BY transactions.id`;
    try {
      const sqlToRun = user.id === 'admin' ? adminSql : sql;
      const transactionItems = await conn.query(sqlToRun);

      const transactionHash = {};
      transactionItems.forEach(i => {
        const id = i.transactions_id;
        const transaction = transactionHash[id] || {
          id: i.transactions_id,
          status: i.status,
          users_id: i.users_id,
          total: i.total,
          updated_at: moment.tz(i.updated_at, 'Asia/Singapore').format('MMMM Do YYYY, h:mm:ss a')
        };
        transaction.transaction_items = transaction.transaction_items || [];
        transaction.transaction_items.push({
          id: i.tid,
          name: i.name,
          unit_price: i.unit_price,
          quantity: i.quantity,
          subtotal: i.subtotal,
        });
        transactionHash[id] = transaction;
      });
      return Object.values(transactionHash);
    } catch(err) {
      throw err;
    }
  },

  delete: async (transactionId) => {
    const sql = `DELETE FROM transaction_items WHERE transactions_id = '${transactionId}';`
    const sql2 = `DELETE FROM transactions WHERE id = '${transactionId}';`;
    console.log('sql', sql);
    console.log('sql2', sql2);
    const result = await conn.query(sql);
    const result2 = await conn.query(sql2);
    return result2.affectedRows > 0;
  },

  update: async (transactionId, transactionItems) => {
    let affectedRows = 0;

    Object.keys(transactionItems).forEach(async i => {
      const sqlTrans = `SELECT unit_price FROM transaction_items INNER JOIN stationaries ON transaction_items.stationaries_id = stationaries.id WHERE transaction_items.id = ${i}`;
      const stationary = await conn.query(sqlTrans);
      const stationaryUnitPrice = stationary[0].unit_price;
      const subtotal = stationaryUnitPrice * transactionItems[i];
      const sql = `UPDATE transaction_items SET quantity = ${transactionItems[i]}, subtotal = ${subtotal} WHERE id = ${i} and transactions_id = ${transactionId}`;
      const result = await conn.query(sql);
      affectedRows += result.affectedRows;
    });

    return affectedRows > 0;
  },

  approveTransaction: async (transactionId) => {
    const sql = `UPDATE transactions SET status = 'approved' WHERE id = ${transactionId}`;
    const result = await conn.query(sql);
    console.log('approveTransaction', result);
    return result;
  }
};
