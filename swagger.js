const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Final Project",
        description: "An application simulating a store management software with features to manage orders, users, items, and stores"
    },
    host: "localhost:3000",
    schemes: ["http", "https"]
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);