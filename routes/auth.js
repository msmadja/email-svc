const {Router}  = require('express');
const authController = require('../controllers/auth.controller');

const router = new Router();


router.use('/login', authController.login);
router.use('/register', authController.register);


module.exports = router;