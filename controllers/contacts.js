const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Get all Contacts'
  // #swagger.description = 'Get a list of all contacts in the data collection'
  // #swagger.operationId = 'getAll'
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Get one Contact'
  // #swagger.description = 'Get the contact information of one contact by contact ID'
  // #swagger.operationId = 'getSingle'
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// create a contact
const postContact = async (req, res, next) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Create a new Contact'
  // #swagger.description = 'Create a new contact by providing all required information'
  // #swagger.operationId = 'postContact'
  // #swagger.responses[201] = { description: 'Contact created successfully.' }
  // #swagger.responses[500] = { description: 'An error occured in the create contact request.' }
  /*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/Contacts" },
        example: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'Johndoe@gmail.com',
            favoriteColor: 'Blue',
            birthday: '04/22/1999'
          }
        }
      }
    }
  } 
  */
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occurred while posting a new contact.');
  }
};

// update one contact email address
const putEmail = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Update Contact Email'
  // #swagger.description = 'Update the Email address of one contact by contact ID'
  // #swagger.operationId = 'putEmail'
  const userId = new ObjectId(req.params.id);
  const contactEmail = {
    email: req.body.email
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .updateOne({ _id: userId }, { $set: contactEmail }, { upsert: false });
  console.log(response);
  if (response.modifiedCount > 0) {
    // #swagger.responses[204] = { description: 'Email address updated successfully.' }
    res.status(204).send();
  } else {
    // #swagger.responses[500] = { description: 'An error occured in the update email request.' }
    res.status(500).json(response.error || 'An error occured in the update email request.');
  }
};

// update one contact using replace contact
const putContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Update Contact Information'
  // #swagger.description = 'Update the contact information of one contact by contact ID'
  // #swagger.operationId = 'putContact'
  // #swagger.responses[204] = { description: 'Contact updated successfully.' }
  // #swagger.responses[500] = { description: 'An error occured in the update contact information request.' }
  /*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/Contacts" },
        example: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'Johndoe@gmail.com',
            favoriteColor: 'Blue',
            birthday: '04/22/1999'
          }
        }
      }
    }
  } 
  */
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'An error occured in the update contact information request.');
  }
};

// Delete a Contact
const deleteContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Delete a Contact'
  // #swagger.description = 'Delete one contact from the data collection by Contact ID.'
  // #swagger.operationId = 'deleteContact'
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    // #swagger.responses[200] = { description: 'Contact deleted successfully.' }
    res.status(200).send();
  } else {
    // #swagger.responses[500] = { description: 'An error occured in the delete request.' }
    res.status(500).json(response.error || 'An error occured with the delete request.');
  }
};

module.exports = {
  getAll,
  getSingle,
  postContact,
  putEmail,
  putContact,
  deleteContact
};
