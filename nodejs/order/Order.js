var db = require('../db');
var payment = require('../payment/payment');
var user = require('../user/user');

var Order = {
    findOrdersByUserId: function(userId, callback)
    {
        return db.query('SELECT * FROM orders WHERE user_id = ?',[userId], callback);
    },
    findAllOrders: function(callback)
    {
        return db.query('SELECT * FROM orders',callback);
    },
    createOrder: function (order, callback) {
        let currentDate = new Date();
        db.query('INSERT INTO orders(amount, user_id, status, created_date, last_updated_date) VALUES(?, ?, ?, ?, ?)',[order.amount, order.user_id, 'created', currentDate, currentDate], function(
            err, result) {
            let orderId = result.insertId;
            payment.createPayment(orderId,function(
                err, p) {
                    user.getUserByUserId(order.user_id, function(
                        err, r){
                       let u = r[0];
                       let declinedReason = null;
                       if(u.pin!=order.pin){
                        declinedReason = 'Invalid PIN';
                       }else if(u.balance<order.amount){
                         declinedReason = 'Insufficient balance';
                       }
                       if(declinedReason==null || declinedReason==''){
                           payment.updatePaymentByPaymentIdAndStatusAndDeclinedReason(p.insertId, 'confirmed',null,function(
                               err, result) {
                               module.exports.updateOrderByOrderIdAndStatus(orderId, 'confirmed',function(
                                   err, update){
                                   return module.exports.getOrderDetailsByUserIdAndOrderId(order.user_id, orderId, callback);
                               });
                           });
                       }else{
                           payment.updatePaymentByPaymentIdAndStatusAndDeclinedReason(p.insertId, 'declined', declinedReason,function(
                               err, result) {
                               module.exports.updateOrderByOrderIdAndStatus(orderId, 'cancelled', function (
                                   err, update) {
                                   return module.exports.getOrderDetailsByUserIdAndOrderId(order.user_id, orderId, callback);
                               });
                           });
                       }
                    });
            });
        });
    },
    updateOrderByOrderIdAndStatus: function(orderId, status, callback) {
        let currentDate = new Date();
        return db.query('UPDATE orders SET status = ?, last_updated_date = ? WHERE order_id = ?',[status, currentDate, orderId], callback);
    },
    searchOrder: function(order, callback){
        let dbQuery = 'SELECT * FROM orders WHERE user_id = ?';
        let arguments = [];
        arguments.push(order.user_id);
        if(order.order_id>0){
            dbQuery+= ' AND order_id = ?';
            arguments.push(order.order_id);
        }
        if(order.status!=null){
            dbQuery+= ' AND status = ?';
            arguments.push(order.status);
        }
        if(order.amount_start && order.amount_end){
            dbQuery+= ' AND amount >= ?';
            arguments.push(order.amount_start);
        }else if(order.amount_start && !order.amount_end){
            dbQuery+= ' AND amount = ?';
            arguments.push(order.amount_start);
        }
        if(order.amount_end){
            dbQuery+= ' AND amount <= ?';
            arguments.push(order.amount_end);
        }
        return db.query(dbQuery,arguments, callback);
    },
    getOrderDetailsByUserIdAndOrderId: function(userId, orderId, callback)
    {
        let dbQuery = 'SELECT orders.order_id, orders.amount, orders.status, orders.user_id, orders.created_date as created_date, payment.status as payment_status, payment.declined_reason, users.update_frequency ' +
            'FROM orders left join payment on orders.order_id = payment.order_id inner join users on orders.user_id = users.user_id WHERE orders.user_id = ? and orders.order_id = ?';
        return db.query(dbQuery, [userId, orderId], callback);
    }
};

module.exports = Order;
