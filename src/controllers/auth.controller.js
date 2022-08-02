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
      const token = generateToken(data.id);
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
          const token = generateToken(data.id);
          res.status(201).send({
            status: "success",
            data: {
              token,
              data,
            },
          });
        }
      });
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
  User.findByEmail(email.trim(), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: "error",
          message: `User with email ${email} was not found`,
        });
        return;
      }
      res.status(500).send({
        status: "error",
        message: err.message,
      });
      return;
    }
    if (data) {
      if (comparePassword(password.trim(), data.password)) {
        const token = generateToken(data.id);
        res.status(200).send({
          status: "success",
          data: {
            token,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
          },
        });
        return;
      }
      res.status(401).send({
        status: "error",
        message: "Incorrect password",
      });
    }
  });
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
              id: decoded["id"],
              firstname: data.firstname,
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
            },
          });
        }
      });
      /*var data = User.findByID(decoded["id"]);
    res.status(201).send({
      status: "success",
      data: data.firstname,
    });*/
    } else {
      res.status(401).send({
        status: "error",
        message: "Token is invalid",
      });
    }
  }
};
