const User = require('../models/user.model');
const Client = require('../models/user.model');

const {
  generate: generateToken,
  decode: decodeToken,
} = require("../utils/token");

const bearerToken =  (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (typeof token == "undefined") {
    res.status(500).send({
      status: "error",
      message: "Bearer Token is required",
    });
  } else {
    token = token.replace(/^Bearer\s+/, "");
    const decoded = decodeToken(token);
    if (decoded == "invalid") {
        res.status(401).send({
        status: "error",
        message: "Token is invalid",
      });
    }
    else{
        next();
    }
}
}

module.exports = bearerToken;