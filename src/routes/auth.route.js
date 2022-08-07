const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const bearerToken = require('../middlewares/bearerToken');
const onlyOrganization = require('../middlewares/onlyOrganization');

const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');
const clientController = require('../controllers/clientController');
const membershipController = require('../controllers/membershipController');
const paymentController = require('../controllers/payment.controller');


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

router.route('/delete-client')
    .post( asyncHandler(bearerToken),asyncHandler(onlyOrganization), asyncHandler(clientController.deleteClient));

router.route('/get-client')
    .post( asyncHandler(bearerToken),asyncHandler(onlyOrganization), asyncHandler(clientController.getClient));

router.route('/edit-client')
    .post( asyncHandler(bearerToken),asyncHandler(onlyOrganization), asyncHandler(clientController.editClient));

router.route('/edit-client-password')
    .post( asyncHandler(bearerToken),asyncHandler(onlyOrganization), asyncHandler(clientController.editClientPassword));

router.route('/add-membership')
    .post( asyncHandler(bearerToken),asyncHandler(onlyOrganization), asyncHandler(membershipController.addMembership));


router.route('/get-membership')
    .post(  asyncHandler(membershipController.getMembership));

router.route('/get-memberships')
    .get(  asyncHandler(membershipController.getMemberships));

router.route('/create-payment-intent')
    .post(  asyncHandler(paymentController.createpaymentIntent));

router.route('/charge-payment')
    .post(  asyncHandler(paymentController.chargePayment));

module.exports = router;