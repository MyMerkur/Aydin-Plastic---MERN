const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const adminController = require('../controllers/adminController');


router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.post('/logout', adminController.logout);


module.exports = router;
