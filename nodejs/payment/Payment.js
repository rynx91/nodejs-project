var db = require('../db');

var Payment = {
    getLatestPaymentByUserId: function(userId, callback)
    {
        return db.query('select * from orders where user_id = ? order by created_date desc limit 1',[userId], callback);
    },
    createPayment: function (orderId, callback) {
        currentDate = new Date();
        return db.query('Insert into payment(status, order_id, created_date, last_updated_date) values(?, ?, ?, ?)',['pending', orderId, currentDate, currentDate], callback);
    },
    updatePaymentByPaymentIdAndStatusAndDeclinedReason: function (paymentId, status, declinedReason, callback) {
        currentDate = new Date();
        return db.query('UPDATE payment SET status = ?, last_updated_date = ? , declined_reason = ? where payment_id = ?',[status, currentDate, declinedReason, paymentId], callback);
    }
}

module.exports = Payment;
