const router = require('express').Router();
const userRoutes = require('./usersroutes');
const thoughtRoutes = require('./thoughtsroutes');

router.use('/user', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router; 