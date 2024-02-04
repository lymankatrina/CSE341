const routes = require('express').Router();
const swaggerUi = ('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

routes.use('/doc', swaggerUi.serve);
routes.get('/doc', swaggerUi.setup(swaggerDocument));

module.exports = routes;