const db = require('../config/db.config');
const { createNewClient: createNewClientQuery } = require('../database/queries');
const { logger } = require('../utils/logger');

class Client {
    constructor(firstname, lastname, email, password,organizationID) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.organizationID=organizationID;
    }

    static createClient(newClient, cb) {
        db.query(createNewClientQuery, 
            [
                newClient.firstname, 
                newClient.lastname, 
                newClient.email, 
                newClient.password,
                newClient.organizationID
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    firstname: newClient.firstname,
                    lastname: newClient.lastname,
                    email: newClient.email,
                    organizationID: newClient.organizationID
                });
        });
    }

}

module.exports = Client;