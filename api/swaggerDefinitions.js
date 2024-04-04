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

  // #region SEGUIMIENTOS

  "/getSeguidores": {
    post: {
      tags: ["Seguimientos"],
      summary: "Get followers of a user",
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
          description: "Followers retrieved successfully",
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
                        IdSeguidor: {
                          type: "integer",
                        },
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
                    example: "Error getting followers.",
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

  "/getSeguidos": {
    post: {
      tags: ["Seguimientos"],
      summary: "Get users followed by a user",
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
          description: "Users followed retrieved successfully",
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
                        IdSeguido: {
                          type: "integer",
                        },
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
                    example: "Error getting users followed.",
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

  "/seguirUsuario": {
    post: {
      tags: ["Seguimientos"],
      summary: "Follow a user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                IdSeguidor: {
                  type: "integer",
                },
                IdSeguido: {
                  type: "integer",
                },
              },
              required: ["IdSeguidor", "IdSeguido"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "User followed successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  results: {
                    type: "object",
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
                    example: "Error following user.",
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

  "/dejarDeSeguirUsuario": {
    post: {
      tags: ["Seguimientos"],
      summary: "Unfollow a user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                IdSeguidor: {
                  type: "integer",
                },
                IdSeguido: {
                  type: "integer",
                },
              },
              required: ["IdSeguidor", "IdSeguido"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "User unfollowed successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  results: {
                    type: "object",
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
                    example: "Error unfollowing user.",
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

  //#endregion SEGUIMIENTOS

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

  "/getCategoriasISubcategorias": {
    get: {
      tags: ["CategoriasSubcategorias"],
      summary: "Get categories and subcategories",
      responses: {
        200: {
          description: "Categories and subcategories retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  categorias: {
                    type: "array",
                    items: {},
                  },
                  subcategorias: {
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
                    example: "Error getting categorias i subcategorias.",
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

  "/postInteresCategoria": {
    post: {
      tags: ["CategoriasSubcategorias"],
      summary: "Post interest in a category",
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
                IdCategoria: {
                  type: "integer",
                },
              },
              required: ["IdUsuario", "IdCategoria"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Interest posted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Interes posted correctly.",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Bad Request",
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
                    example: "Error posting interes categoria.",
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

  "/postInteresSubcategoria": {
    post: {
      tags: ["CategoriasSubcategorias"],
      summary: "Post interest in a subcategory",
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
                IdSubcategoria: {
                  type: "integer",
                },
              },
              required: ["IdUsuario", "IdSubcategoria"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Interest posted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Interest posted correctly.",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Bad Request",
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
                    example: "Error posting interest subcategory.",
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

  "/deleteInteresCategoria": {
    post: {
      tags: ["CategoriasSubcategorias"],
      summary: "Delete interest in a category",
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
                IdCategoria: {
                  type: "integer",
                },
              },
              required: ["IdUsuario", "IdCategoria"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Interest deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Interest deleted correctly.",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Bad Request",
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
                    example: "Error deleting interest category.",
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

  "/deleteInteresSubcategoria": {
    post: {
      tags: ["CategoriasSubcategorias"],
      summary: "Delete interest in a subcategory",
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
                IdSubcategoria: {
                  type: "integer",
                },
              },
              required: ["IdUsuario", "IdSubcategoria"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Interest deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Interest deleted correctly.",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Bad Request",
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
                    example: "Error deleting interest subcategory.",
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

  // #endregion CATEGORIAS I SUBCATEGORIAS
};

module.exports = swaggerDefinitions;
