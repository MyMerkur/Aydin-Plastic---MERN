const express = require('express');
const router = express.Router();
const contactController = require('../controllers/ContactControllers');

router.post('/contact', contactController.createContact);
router.get('/contacts', contactController.getContacts);
module.exports = router