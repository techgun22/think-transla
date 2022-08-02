const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/secrets');
const { logger } = require('./logger');

const generate = (id,role) => jwt.sign({ id,role }, JWT_SECRET_KEY, { expiresIn: '60d'});

const decode = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY)
    } catch (error) {
        return "invalid";
        logger.error(error);
    }
};

module.exports = {
    generate,
    decode
}