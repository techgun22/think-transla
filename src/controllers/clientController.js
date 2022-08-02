const Client = require("../models/client.model");


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