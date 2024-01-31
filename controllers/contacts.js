const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  // #swagger.summary = 'Get list of all contacts'
  // #swagger.description = 'This will list all of the contacts in the database'
  // #swagger.parameters[]
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  // #swagger.summary = 'Get a single contact by ID'
  // #swagger.description = 'To get a single contact enter a user ID'
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// create a contact
const postContact = async (req, res, next) => {
  // #swagger.summary = 'Create a new contact'
  // #swagger.description = 'To create a new contact, enter all of the required information'
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
  // #swagger.summary = 'Update a contacts email address by ID'
  // #swagger.description = 'To change a contacts email address, enter the user Id and new email address'
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
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occured in the update email request.');
  }
};

// update one contact using replace contact
const putContact = async (req, res) => {
  // #swagger.summary = 'Update all contact information by ID'
  // #swagger.description = 'To change a contacts information enter the ID and all required information.'
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
  // #swagger.summary = 'Delete a contact by ID'
  // #swagger.description = 'To delete a contact enter the ID'
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
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
