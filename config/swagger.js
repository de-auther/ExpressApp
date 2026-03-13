import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express Auth API",
      version: "1.0.0",
      description: "API documentation for the Express authentication system"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/*.js"] 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;