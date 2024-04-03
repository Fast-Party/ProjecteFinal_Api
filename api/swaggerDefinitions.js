const swaggerDefinitions = {
  "/login": {
    post: {
      tags: ["Usuarios"],
      summary: "Login de Usuario",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                NombreUsuario: {
                  type: "string",
                },
                Contrasenya: {
                  type: "string",
                },
              },
              required: ["NombreUsuario", "Contrasenya"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "User authenticated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  isAuthenticated: {
                    type: "boolean",
                    example: true,
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  isAuthenticated: {
                    type: "boolean",
                    example: false,
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Username and password are required.",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Error authenticating user.",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/registrarUsuario": {
    post: {
      tags: ["Usuarios"], // Add a tag to group endpoints
      summary: "Registrar Usuario",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                NombreUsuario: {
                  type: "string",
                },
                Nombre: {
                  type: "string",
                },
                Contrasenya: {
                  type: "string",
                },
                Email: {
                  type: "string",
                  format: "email",
                },
                Telefono: {
                  type: "string",
                },
                FechaNacimiento: {
                  type: "string",
                  format: "date",
                },
                Tipo: {
                  type: "integer",
                },
              },
              required: [
                "NombreUsuario",
                "Nombre",
                "Contrasenya",
                "Email",
                "Telefono",
                "FechaNacimiento",
                "Tipo",
              ],
            },
          },
        },
      },
      responses: {
        200: {
          description: "User registered successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User registered correctly.",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Fields are required.",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Error registering user.",
                  },
                  err: {
                    type: "string", // Adjust the type as per your error handling needs
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = swaggerDefinitions;
