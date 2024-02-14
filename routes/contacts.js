/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();
// add validation rules for express-validator
const { validate, userValidationRules } = require('../validator');
// import contacts controller functions
const contactsController = require('../controllers/contacts');

// Get a list of all contacts
router.get('/', contactsController.getAll);

// Get a list of a single contact by ID
router.get('/:id', contactsController.getSingle);

// Create a new contact
router.post('/', userValidationRules(), validate, contactsController.postContact);

// Update a contacts email address by ID
router.put('/:id/updateEmail', userValidationRules(), validate, contactsController.putEmail);

// Update contact information by
router.put('/:id', userValidationRules(), validate,contactsController.putContact);

// Delete a contact by ID
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
