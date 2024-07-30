const { Router }  = require('express');
const emailRouter = require('./email');
const authRouter = require('./auth');
const userRouter = require('./user');

const router =  new Router();

router.use('/email', emailRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;