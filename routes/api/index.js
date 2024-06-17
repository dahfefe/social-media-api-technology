const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const studentRoutes = require('./studentRoutes');

router.use('/users', usersRoutes);
router.use('/students', studentRoutes);

module.exports = router;
