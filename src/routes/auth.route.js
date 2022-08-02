const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');


router.route('/organizationSignup')
    .post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.signup));

router.route('/organizationsignin')
    .post(signinValidator, asyncHandler(authController.signin));

router.route('/validateToken')
    .get(asyncHandler(authController.validateToken));

router.route('/add-client')
    .post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.createClient));

module.exports = router;