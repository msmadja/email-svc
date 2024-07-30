const { Router }  = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

const router =  new Router();

router.get('/me', authMiddleware, userController.me);


module.exports = router;