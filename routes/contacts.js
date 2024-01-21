const express = require('express');

const contactsController = require("../controllers/contacts");

const router = express.Router();

router.get('/', contactsController.getData);

module.exports = router;
