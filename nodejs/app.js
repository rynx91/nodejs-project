var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());

var OrderController = require('./order/OrderController');
app.use('/order', OrderController);

var PaymentController = require('./payment/PaymentController');
app.use('/payment', PaymentController);

var UserController = require('./user/UserController');
app.use('/user', UserController);

module.exports = app;


