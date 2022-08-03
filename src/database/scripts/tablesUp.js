const { logger } = require('../../utils/logger');
const { createTableUSers: createTableUSersQuery,createTableClients: createTableClientsQuery } = require('../queries');
const { createTableMembership: createTableMembershipQuery } = require('../membershipQueries');

(() => {    
   require('../../config/db.config').query(createTableUSersQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table users created!');
        process.exit(0);
    });
    require('../../config/db.config').query(createTableClientsQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table client created!');
        process.exit(0);
    });

    require('../../config/db.config').query(createTableMembershipQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table membership created!');
        process.exit(0);
    });
})();
