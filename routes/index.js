const routes = require('express').Router();
// const names = require('../controllers/');
// const contactsRoutes = require('../controllers/contacts');

// routes.get('/', names.displayNoName);
// routes.get('/home', names.displayName);
routes.get('/doc');
routes.use('/contacts', require('./contacts'));

module.exports = routes;
