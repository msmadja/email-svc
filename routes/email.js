const { Router }  = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const emailController = require('../controllers/email.controller');

const router =  new Router();

router.get('/', authMiddleware, emailController.getEmails);
router.post('/send', authMiddleware, emailController.sendEmail);


module.exports = router;