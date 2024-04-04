const swaggerDefinitions = {
  // #region USUARIOS

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

  "/buscarUsuarios": {
    post: {
      tags: ["Usuarios"],
      summary: "Busqueda de Usuarios",
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
              },
              required: ["NombreUsuario"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Search results returned successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  results: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        IdUsuario: { type: "integer" },
                        NombreUsuario: { type: "string" },
                        Nombre: { type: "string" },
                        Imagen: { type: "string" },
                        Seguidores: { type: "integer" },
                        Valoracion: { type: "number" },
                      },
                    },
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
                    example: "Error searching for users.",
                  },
                  err: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/perfilUsuario": {
    post: {
      tags: ["Usuarios"],
      summary: "Get user profile and associated plans",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                IdUsuario: {
                  type: "integer",
                },
              },
              required: ["IdUsuario"],
            },
          },
        },
      },
      responses: {
        200: {
          description:
            "User profile and associated plans retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  perfil: {
                    type: "array",
                    items: {},
                  },
                  planes: {
                    type: "array",
                    items: {},
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
                    example: "Error getting perfil de usuario.",
                  },
                  err: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  // #endregion USUARIOS

  // #region PLANES

  "/getPlanes": {
    get: {
      tags: ["Planes"], // Add a tag to group endpoints
      summary: "Get Planes",
      responses: {
        200: {
          description: "Planes retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  results: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {},
                    },
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
                    example: "Error getting planes.",
                  },
                  err: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/getPlanesDeUsuario": {
    post: {
      tags: ["Planes"],
      summary: "Get Planes de Usuario",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                IdUsuario: {
                  type: "integer",
                },
              },
              required: ["IdUsuario"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Planes retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  results: {
                    type: "array",
                    items: {},
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
                    example: "Error getting planes.",
                  },
                  err: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  // #endregion PLANES

  // #region CATEGORIAS I SUBCATEGORIAS

  // #endregion CATEGORIAS I SUBCATEGORIAS
};

module.exports = swaggerDefinitions;
