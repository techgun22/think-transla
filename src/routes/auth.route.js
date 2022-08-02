const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const bearerToken = require('../middlewares/bearerToken');
const onlyOrganization = require('../middlewares/onlyOrganization');

const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');
const clientController = require('../controllers/clientController');


router.route('/organizationSignup')
    .post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.signup));

router.route('/signin')
    .post(signinValidator, asyncHandler(authController.signin));

router.route('/validateToken')
    .get(asyncHandler(authController.validateToken));

router.route('/add-client')
    .post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.createClient));

router.route('/get-clients')
    .get( asyncHandler(bearerToken),asyncHandler(onlyOrganization), asyncHandler(clientController.getClients));


module.exports = router;