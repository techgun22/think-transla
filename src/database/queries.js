const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
    
    )
`;

const createTableClients = `
CREATE TABLE IF NOT EXISTS clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    organizationID INT NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    country VARCHAR(50) NULL,
    phone INT NULL,
    profile VARCHAR(50) NULL,
    timeZone VARCHAR(50) NULL,
    bio VARCHAR(250) NULL,
    website VARCHAR(250) NULL
)
`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?, NOW())
`;

const createNewClient = `
INSERT INTO clients VALUES(null, ?, ?, ?, ?, ?, NOW(),null,null,null,null,null,null)
`;

const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;

const findClientByEmail = `
SELECT * FROM clients WHERE email = ?
`;

const findUserByID = `
SELECT * FROM users WHERE id = ?
`;

const findClientByID = `
SELECT * FROM clients WHERE id = ?
`;

const getClientsforOrganization = `
SELECT * FROM clients WHERE organizationID = ?
`;

const deleteClient = `
DELETE FROM clients WHERE email = ?
`;

const EditClient = `
UPDATE clients
SET firstname = ?, lastname= ?, country= ?, phone= ?, profile= ?, timeZone= ?, bio= ?, website= ?
WHERE id = ?;
`;

const EditClientPassword = `
UPDATE clients
SET password = ?
WHERE email = ?;
`;

const GetClient = `
SELECT firstname,lastname,country,phone,profile,timeZone,bio,website FROM clients WHERE id = ?;
`;

module.exports = {
    createDB,
    createTableClients,
    dropDB,
    createTableUSers,
    createNewUser,
    findUserByEmail,
    findUserByID,
    createNewClient,
    findClientByEmail,
    findClientByID,
    getClientsforOrganization,
    deleteClient,
    EditClient,
    GetClient,
    EditClientPassword
};
