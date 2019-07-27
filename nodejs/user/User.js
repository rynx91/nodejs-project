var db = require('../db');

var User = {
    verifyUserPin: function(userId, pin, callback)
    {
        db.query('SELECT pin FROM users WHERE user_id = ?',[userId], function (err, result) {

            let isVerified = false;
            if(result[0].pin==pin){
                isVerified = true;
            }
            callback(err, isVerified);
        });
    },
    getUserByUserId: function(userId, callback)
    {
        return db.query('SELECT * FROM users WHERE user_id = ?', [userId], callback);
    },
    updateFrequencyByUserId: function(userId, frequency, callback)
    {
        return db.query('UPDATE users SET update_frequency = ? WHERE user_id = ?', [frequency, userId], callback);
    }
};

module.exports = User;
