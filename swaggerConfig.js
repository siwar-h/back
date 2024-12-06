const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Node.js API Documentation',
        version: '1.0.0',
        description: 'API documentation for the Node.js project',
        contact: {
            name: 'Your Name',
            email: 'your_email@example.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Development server',
        },
    ],
};

// Swagger options
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to the API docs
};

// Initialize Swagger JSDoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
