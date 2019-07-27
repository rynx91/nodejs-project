var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
var User = require('./User');

router.get('/', function (req, res) {
    User.getUserByUserId(req.query.userId,function(err,data){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.send(data);
        }
    });
});

router.get('/verify', function (req, res) {
    User.verifyUserPin(req.query.userId, req.query.pin,function(err,data){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.send(data);
        }
    });
});

router.post('/update-frequency', function (req, res) {
    User.updateFrequencyByUserId(req.query.userId, req.query.updateFrequency,function(err,data){
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
