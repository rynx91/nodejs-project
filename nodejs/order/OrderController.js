var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
var Order = require('./Order');

router.get('/', function (req, res) {
    let userId = req.query.userId;
    Order.findOrdersByUserId(userId,function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.post('/create', function (req, res) {
    Order.createOrder(req.body,function(err,rows){
        if(err)
        {
            res.status(400).json(err);
        }
        else{
            res.json(rows[0]);
        }
    });
});

router.post('/update', function (req, res) {
    let orderId = req.body.orderId;
    let status = req.body.status;
    Order.updateOrderByOrderIdAndStatus(orderId, status,function(err,count){
        if(err)
        {
            res.status(400).json(err);
        }
        else{
            res.json(req.body);
        }
    });
});
router.post('/search', function (req, res) {
    Order.searchOrder(req.body,function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.get('/id', function (req, res) {
    let userId = req.query.userId;
    let orderId = req.query.orderId;
    Order.getOrderDetailsByUserIdAndOrderId(userId, orderId,function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

module.exports = router;
