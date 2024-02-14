const options = {
  openapi: '3.0.0',
  autoHeaders: true,
  autoQuery: true,
  autoBody: true
};
const swaggerAutogen = require('swagger-autogen')(options);

const doc = {
  info: {
    version: '',
    title: 'Contacts API',
    description:
      'This is a simple CRUD API application created using Node and Express. It was documented using Swagger Autogen and Swagger UI Express',
    contact: {
      name: 'KatrinaLyman',
      url: 'https://github.com/lymankatrina/CSE341'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local Host'
    },
    {
      url: 'https://katrina341.onrender.com',
      description: 'Render website'
    }
  ],
  tags: ['Contacts'],
  components: {
    schemas: {
      Contacts: {
        properties: {
          $firstName: {
            type: 'string',
            minLength: 2,
            maxLength: 20
          },
          $lastName: {
            type: 'string',
            minLength: 2,
            maxLength: 20
          },
          $email: {
            type: 'string'
          },
          $favoriteColor: {
            type: 'string',
            minLength: 3,
            maxLength: 20
          },
          $birthday: {
            type: 'string'
          }
        }
      },
      examples: {
        Contacts: {
          $firstName: 'John',
          $lastName: 'Doe',
          $email: 'Johndoe@gmail.com',
          $favoriteColor: 'Blue',
          $birthday: '04/22/1999'
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
