const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Final Project',
      version: '1.0.0',
      description: 'Store management system: users, items, orders, and stores',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        url: 'https://cse341-node-r7l4.onrender.com'
      },
    ],
  },
  apis: [
    './routes/item-routes.js',
    './routes/user-routes.js',
    './routes/order-routes.js',
    './routes/store-routes.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
