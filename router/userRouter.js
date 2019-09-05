const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/', (req, res) => {
  userController.create(req.body).then(data => {
    console.log('userController data', data);
    req.session.user = data;
    res.render('home', { user: req.session.user });
  }).catch(err => {
    console.log('new err', err);
    res.render('app', { msg: err });
  });
});

module.exports = router;