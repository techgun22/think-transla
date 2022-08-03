const db = require('../config/db.config');
const {getMembershipById:getMembershipByIdQuery,createNewMembership:createNewMembershipQuery } = require('../database/membershipQueries');
const { logger } = require('../utils/logger');

class Membership {
    constructor(name, description, monthlyCost, numberOfClients) {
        this.name = name;
        this.description = description;
        this.monthlyCost = monthlyCost;
        this.numberOfClients = numberOfClients;
    }

    static createMembership(newMembership, cb) {
        
        db.query(createNewMembershipQuery, 
            [
                newMembership.name, 
                newMembership.description, 
                newMembership.monthlyCost, 
                newMembership.numberOfClients
            ], (err, res) => {
                
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    name: newMembership.name,
                    description: newMembership.description,
                    monthlyCost: newMembership.monthlyCost,
                    numberOfClients: newMembership.numberOfClients
                });
        });
    }

    static getMembershipById(ID, cb) {
        db.query(getMembershipByIdQuery, ID, (err, res) => {
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
module.exports = Membership;