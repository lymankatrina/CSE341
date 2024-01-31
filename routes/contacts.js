const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

// Get a list of all contacts
router.get('/', contactsController.getAll);

// Get a list of a single contact by ID
router.get('/:id', contactsController.getSingle);

// Create a new contact
router.post('/', contactsController.postContact);

// Update a contacts email address by ID
router.put('/:id/updateEmail', contactsController.putEmail);

// Update contact information by ID
router.put('/:id', contactsController.putContact);

// Delete a contact by ID
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
