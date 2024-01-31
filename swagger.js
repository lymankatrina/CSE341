const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    version: '',
    title: 'Contacts API',
    description:
      'This is a simple CRUD API application created using Node and Express. It was documented using Swagger Autogen and Swagger UI Express',
    contact: {
      name: 'KatrinaLyman',
      url: 'https://github.com/lymankatrina/CSE341'
    },
    servers: [
      {
        url: '',
        description: ''
      },
      {
        url: 'https://katrina341.onrender.com',
        description: ''
      }
    ],
  },
  tags: [],
  components: {}
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
