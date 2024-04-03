const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDefinitions = require("./swaggerDefinitions");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "",
    },
    paths: swaggerDefinitions,
  },
  apis: [], // Leave it empty as we are not using separate files for Swagger annotations
};

const specs = swaggerJsdoc(options);

module.exports = specs;
