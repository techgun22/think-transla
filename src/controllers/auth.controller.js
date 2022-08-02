const User = require("../models/user.model");
const Client = require("../models/client.model");

const {
  hash: hashPassword,
  compare: comparePassword,
} = require("../utils/password");
const {
  generate: generateToken,
  decode: decodeToken,
} = require("../utils/token");

exports.signup = (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const hashedPassword = hashPassword(password.trim());

  const user = new User(
    firstname.trim(),
    lastname.trim(),
    email.trim(),
    hashedPassword
  );

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      const token = generateToken(data.id,'organization');
      res.status(201).send({
        status: "success",
        data: {
          token,
          data,
        },
      });
    }
  });
};

exports.createClient = (req, res) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (typeof token == "undefined") {
    res.status(500).send({
      status: "error",
      message: "Bearer Token is required",
    });
  } else {
    token = token.replace(/^Bearer\s+/, "");
    const decoded = decodeToken(token);

    if (decoded != "invalid") {
      if(decoded['role']!='organization'){
        res.status(500).send({
          status: "error",
          message: "Only organizations can create clients",
        });
      }
      else{
      const { firstname, lastname, email, password } = req.body;
      const hashedPassword = hashPassword(password.trim());

      const client = new Client(
        firstname.trim(),
        lastname.trim(),
        email.trim(),
        hashedPassword,
        decoded["id"]
      );

      Client.createClient(client, (err, data) => {
        if (err) {
          res.status(500).send({
            status: "error",
            message: err.message,
          });
        } else {
          const token = generateToken(data.id,'client');
          res.status(201).send({
            status: "success",
            data: {
              token,
              data,
            },
          });
        }
      });}
    } else {
      res.status(401).send({
        status: "error",
        message: "Token is invalid",
      });
    }
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  var resData="";
  User.findByEmail(email.trim(), (err, data) => {
    resData=data;
    if (err) {
        Client.findByEmail(email.trim(), (err1, data1) => {
          if (err1) {
            if (err1.kind === "not_found") {
              res.status(404).send({
                status: "error",
                message: `User with email ${email} was not found`,
              });
              return;
            }
            res.status(500).send({
              status: "error",
              message: err1.message,
            });
            return;
          }
          else{
            resData=data1;
            signInRestRes(resData,res,'client');
          }
        });
    }

    if (resData) {
      signInRestRes(resData,res,'organization');
    }

  });

  function signInRestRes(resData,res,role){
    if (comparePassword(password.trim(), resData.password)) {
      const token = generateToken(resData.id,role);
      res.status(200).send({
        status: "success",
        data: {
          token,
          firstname: resData.firstname,
          lastname: resData.lastname,
          email: resData.email,
          role:role
        },
      });
      return;
    }
    res.status(401).send({
      status: "error",
      message: "Incorrect password",
    });
  }
};

exports.validateToken = (req, res) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (typeof token == "undefined") {
    res.status(500).send({
      status: "error",
      message: "Bearer Token is required",
    });
  } else {
    token = token.replace(/^Bearer\s+/, "");
    const decoded = decodeToken(token);

    if (decoded != "invalid") {
      if(decoded['role']=='organization'){
        User.findByID(decoded["id"], (err, data) => {
          if (err) {
            res.status(500).send({
              status: "error",
              message: err.message,
            });
          } else {
            res.status(201).send({
              status: "success",
              data: {
                id: decoded['id'],
                firstname: data.firstname,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                role:decoded['role']
              },
            });
          }
        });
      }
      if(decoded['role']=='client'){
        Client.findByID(decoded["id"], (err, data) => {
          if (err) {
            res.status(500).send({
              status: "error",
              message: err.message,
            });
          } else {
            res.status(201).send({
              status: "success",
              data: {
                id: decoded['id'],
                firstname: data.firstname,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                role:decoded['role']
              },
            });
          }
        });
      }
     
      
    } else {
      res.status(401).send({
        status: "error",
        message: "Token is invalid",
      });
    }
  }
};
