const db = require('../config/db.config');
const {EditClientPassword:EditClientPasswordQuery,GetClient:GetClientQuery,EditClient:EditClientQuery, deleteClient:deleteClientQuery,getClientsforOrganization:getClientsforOrganizationQuery, createNewClient: createNewClientQuery, findClientByEmail: findClientByEmailQuery,findClientByID:findClientByIDQuery } = require('../database/queries');
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

    static getClientsforOrganization(ID, cb) {
        db.query(getClientsforOrganizationQuery, ID, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static deleteClient(email, cb) {
        db.query(deleteClientQuery, email, (err, res) => {
            cb(null, null);
            return;
        })
    }

    static getClient(email, cb) {
        db.query(GetClientQuery, email, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static editClient([email,firstname,lastname,country,phone,profile,timeZone,bio,website], cb) {
        db.query(EditClientQuery,[firstname,lastname,country,phone,profile,timeZone,bio,website,email], (err, res) => {
            cb(null, null);
            return;
        })
    }

    static editClientPassword([email,password], cb) {
        db.query(EditClientPasswordQuery,[password,email], (err, res) => {
            cb(null, null);
            return;
        })
    }

    static findByEmail(email, cb) {
        db.query(findClientByEmailQuery, email, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static findByID(id, cb) {
        db.query(findClientByIDQuery, id, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

}

module.exports = Client;