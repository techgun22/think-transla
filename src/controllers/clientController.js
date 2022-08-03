const Client = require("../models/client.model");

const {
  hash: hashPassword,
  compare: comparePassword,
} = require("../utils/password");

exports.getClients = (req, res) => {
  

const {
  generate: generateToken,
  decode: decodeToken,
} = require("../utils/token");

	let token = req.headers["x-access-token"] || req.headers["authorization"];
  	token = token.replace(/^Bearer\s+/, "");
    const decoded = decodeToken(token);

	Client.getClientsforOrganization(decoded['id'], (err, data) => {
    
		res.status(201).send({
              status: "success",
              data: data,
            });
	});
}

exports.deleteClient = (req, res) => {
  const { email } = req.body;
 
  Client.deleteClient(email, (err, data) => {
		res.status(201).send({
              status: "success",
              data: 'Client deleted successfully',
            });
	});
}

exports.getClient = (req, res) => {
  const { email } = req.body;
 
  Client.getClient(email, (err, data) => {
		res.status(201).send({
              status: "success",
              data: data,
            });
	});
}



exports.editClient = (req, res) => {
  const { firstname,lastname,country,phone,profile,timeZone,bio,website,email } = req.body;
 
  Client.editClient([email,firstname,lastname,country,phone,profile,timeZone,bio,website], (err, data) => {
		res.status(201).send({
              status: "success",
              data: 'Client profile details edited successfully',
            });
	});
}

exports.editClientPassword = (req, res) => {
  const { password,email } = req.body;
  const hashedPassword = hashPassword(password.trim());
  Client.editClientPassword([email,hashedPassword], (err, data) => {
		res.status(201).send({
              status: "success",
              data: 'Password updated successfully',
            });
	});
}