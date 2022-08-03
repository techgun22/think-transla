const { DB_NAME } = require('../utils/secrets')

const createTableMembership = `
CREATE TABLE IF NOT EXISTS memberships (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200) NULL,
    monthlyCost INT NOT NULL,
    numberOfClients INT NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
    )
`;

const createNewMembership= `
INSERT INTO memberships VALUES(null, ?, ?, ?, ?, NOW())
`;

const getMembershipById= `
SELECT * FROM memberships WHERE id = ?
`;


module.exports = {
    createTableMembership,
    createNewMembership,
    getMembershipById
};
