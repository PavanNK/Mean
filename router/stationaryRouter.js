const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.session.stationaries = req.session.stationaries || {};
  const { item_id, quantity } = req.body;
  req.session.stationaries[item_id] = quantity;
  req.session.save(function(err) {
    res.redirect('/shop')
  })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  delete req.session.stationaries[id];
  res.status(200).end();
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const newQuantity = req.body.quantity;
  req.session.stationaries[id] = newQuantity;
  res.status(200).end();
});

module.exports = router;