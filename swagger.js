const swaggerAutogen = require('swagger-autogen')();
const port = process.env.PORT || 3000;

const doc = {
  info: {
    title: 'My API',
    description: 'Contacts API'
  },
  host: port
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);