const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  console.log('id', id);
  const result = await transactionController.delete(id);
  console.log('result2', result);
  res.status(200).end();
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log('inside TransactionRouter');
  console.log('body', body);
  const result = await transactionController.update(id, body);
  res.status(200).end();
});

router.post('/:id/approve', async (req, res) => {
  const id = req.params.id;
  const result = await transactionController.approveTransaction(id);
  res.status(200).end();
});

module.exports = router;