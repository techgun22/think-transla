const User = require('../models/user.model');
const Client = require('../models/user.model');

const checkEmail =  (req, res, next) => {
    const { email } = req.body;
    User.findByEmail(email, (_, data) => {
        if (data) {
            res.status(400).send({
                status: 'error',
                message: `A user with email address '${email}' already exits`
            });
            return;
        }
        else{
            Client.findByEmail(email, (_, data) => {
                if (data) {
                    res.status(400).send({
                        status: 'error',
                        message: `A user with email address '${email}' already exits`
                    });
                    return;
                }
            });
            
        }
        next();
    });
   
}

module.exports = checkEmail;