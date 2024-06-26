const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

// Opciones de configuración para Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Especificación OpenAPI (Swagger) utilizada
    info: {
      title: "Footy Management API",
      version: "1.0.0",
      description: "Documentación de la API de Footy Management. ",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:3000", // URL base de tu API
        description: "Development server",
      },
    ],
  },
  apis: [path.resolve(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerSpec, swaggerUi };
