// This is going to create a modular web application using node.js express routers
const express = require('express');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const port = process.env.PORT || 3000;

// const contactsRoutes = require('./routes/contacts');

app
  .use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
//  .use('/contacts', contactsRoutes);
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and Web Server is listening on port ${port}`);
    });

  }
});