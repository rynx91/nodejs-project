var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
var Payment = require('./Payment');

router.get('/', function (req, res) {
    var userId = req.query.userId;
    Payment.getLatestPaymentByUserId(userId,function(err,rows){
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
    Payment.createPayment(req.body,function(err,count){
        if(err)
        {
            res.status(400).json(err);
        }
        else{
            res.json(req.body);
        }
    });
});

router.post('/update', function (req, res) {
    let paymentId = req.query.paymentId;
    let status = req.query.status;
    let declinedReason = req.query.declinedReason;
    Payment.updatePaymentByPaymentIdAndStatusAndDeclinedReason(paymentId,status,declinedReason,function(err,count){
        if(err)
        {
            res.status(400).json(err);
        }
        else{
            res.json(req.body);
        }
    });
});

module.exports = router;
