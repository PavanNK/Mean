const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');
const moment = require('moment-timezone');
const authenticator = require('./authenticator');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: "Shh, its a secret!",
  saveUninitialized: true,
  resave: true
}));

// routers
const stationaryRouter = require('./router/stationaryRouter');
const userRouter = require('./router/userRouter');
const transactionRouter = require('./router/transactionRouter');
app.use('/stationaries', stationaryRouter);
app.use('/users', userRouter);
app.use('/transactions', transactionRouter);

// controllers
const stationaryController = require('./controller/stationaryController');
const transactionController = require('./controller/transactionController');

app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/home');
    return;
  }
  res.render('app');
});

app.post('/process_login', async (req, res) => {
  const params = req.body;
  const user = await authenticator.authenticate(params.username, params.password);
  console.log('what is user', user);
  if (typeof user !== undefined && user !== null) {
    req.session.user = user;
    res.redirect('/home');
  } else {
    res.render('app', {msg: 'Login failed!'})
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/home', async (req, res) => {
  const user = req.session.user;
  if (user === undefined || user === null) {
    res.redirect('/logout');
    return;
  }

  const userTransactions = await transactionController.index(user);
  console.log('what is userTransactions', userTransactions);
  res.render('home', { user: user, transactions: userTransactions });
});

app.get('/shop', (req, res) => {
  if (req.session.user === undefined || req.session.user === null) {
    res.redirect('/logout');
    return;
  }
  stationaryController.index().then(data => {
    res.render('shop', { user: req.session.user, stationaries: data });
  }).catch(err => res.render('shop', {}));
});

app.get('/cart', (req, res) => {
  if (req.session.user === undefined || req.session.user === null) {
    res.redirect('/logout');
    return;
  }
  stationaryController.index().then(data => {
    const dataHash = {};
    data.forEach(d => dataHash[d.id] = d);
    req.session.storeStationaries = dataHash;
    res.render('cart', { user: req.session.user, stationaries: dataHash, cart_stationaries: req.session.stationaries});
    console.log(data);
  }).catch(err => res.render('cart', {}));
});

app.post('/order', (req, res) => {
  if (req.session.user === undefined || req.session.user === null) {
    res.redirect('/logout');
    return;
  }

  transactionController.create(req.session.user, req.session.stationaries, req.session.storeStationaries).then(() => {
    delete req.session.stationaries;
    res.redirect('/home');
  }).catch(err => console.log(err));
});

app.listen(process.env.PORT || 3000, () => console.info('Node Application running'));
