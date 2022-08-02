const User = require('../models/user.model');
const Client = require('../models/user.model');

const {
  generate: generateToken,
  decode: decodeToken,
} = require("../utils/token");

const onlyOrganization =  (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    token = token.replace(/^Bearer\s+/, "");
    const decoded = decodeToken(token);
    if(decoded['role']!='organization'){
       res.status(500).send({
      status: "error",
      message: "Only organizations can access this Api",
    });
    }
    else{
      next();
    }
}

module.exports = onlyOrganization;