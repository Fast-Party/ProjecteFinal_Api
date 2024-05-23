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

  "/nombreUsuarioLibre": {
    post: {
      tags: ["Usuarios"],
      summary: "Check username availability",
      description: "Check if the provided username is available",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                NombreUsuario: { type: "string" },
              },
              required: ["NombreUsuario"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Username availability checked successfully",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    IdUsuario: { type: "integer" },
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
                  message: { type: "string" },
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
                  message: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
  "/correoLibre": {
    post: {
      tags: ["Usuarios"],
      summary: "Check email availability",
      description: "Check if the provided email is available",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                Email: { type: "string", format: "email" },
              },
              required: ["Email"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Email availability checked successfully",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    IdUsuario: { type: "integer" },
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
                  message: { type: "string" },
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
                  message: { type: "string" },
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

  "/getInfoUsuarioLogged": {
    post: {
      tags: ["Usuarios"],
      summary: "Obtener información del usuario logueado",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                IdUsuario: {
                  type: "integer",
                  description: "ID del usuario",
                  example: 1
                }
              },
              required: ["IdUsuario"]
            }
          }
        }
      },
      responses: {
        200: {
          description: "Información del usuario obtenida con éxito",
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
                        NombreUsuario: {
                          type: "string",
                          example: "usuario123"
                        },
                        Email: {
                          type: "string",
                          format: "email",
                          example: "usuario123@example.com"
                        },
                        Imagen: {
                          type: "string",
                          example: "url_de_la_imagen.jpg"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: "Solicitud incorrecta",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "ID de usuario es requerido."
                  }
                }
              }
            }
          }
        },
        500: {
          description: "Error interno del servidor",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Error obteniendo información del usuario."
                  },
                  err: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  "/updatePerfilUsuario": {
    post: {
      tags: ["Usuarios"],
      summary: "Actualizar Perfil de Usuario",
      description: "Actualiza el perfil de usuario en la base de datos",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                Descripcion: {
                  type: "string",
                  description: "Nueva descripción del usuario",
                },
                FechaNacimiento: {
                  type: "string",
                  format: "date",
                  description: "Nueva fecha de nacimiento del usuario",
                },
                Localidad: {
                  type: "string",
                  description: "Nueva localidad del usuario",
                },
                Imagen: {
                  type: "string",
                  description: "Nueva imagen del usuario",
                },
                CuentaPrivada: {
                  type: "boolean",
                  description:
                    "Nuevo estado de privacidad de la cuenta del usuario",
                },
                IdUsuario: {
                  type: "integer",
                  description: "ID del usuario a actualizar",
                  required: true,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Perfil de usuario actualizado correctamente",
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
          description: "Error interno del servidor",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Error actualizando perfil de usuario.",
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

  // #region AUTORES

  "/perfilAutor": {
    post: {
      tags: ["Autores"],
      summary: "Get perfil de autor",
      description: "Fetch detailed information about the author profile",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                IdUsuario: { type: "integer" },
              },
              required: ["IdUsuario"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Author profile fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  perfil: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        NombreUsuario: { type: "string" },
                        Nombre: { type: "string" },
                        Descripcion: { type: "string" },
                        FechaNacimiento: { type: "string", format: "date" },
                        Imagen: { type: "string" },
                        CuentaPrivada: { type: "boolean" },
                        Verificado: { type: "boolean" },
                        Seguidores: { type: "integer" },
                        Valoracion: { type: "number", format: "float" },
                      },
                    },
                  },
                  planes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        // Define the properties of a plan here
                      },
                    },
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
                  message: { type: "string" },
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
                  message: { type: "string" },
                  err: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },

  // #endregion AUTORES

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

  /*"/getPlanes": {
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
  },*/

  "/getPlanes": {
    post: {
      tags: ["Planes"],
      summary: "Get planes",
      description: "Retrieve plans along with associated user information",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                IdUsuario: { type: "integer" },
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
                    items: {
                      type: "object",
                      properties: {
                        // Define properties of the returned results here based on your database schema
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Error getting planes",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  err: { type: "string" },
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
                  message: { type: "string" },
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

  "/getPlanById": {
    post: {
      tags: ["Planes"],
      summary: "Get plan by ID",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                IdPlan: {
                  type: "integer",
                },
              },
              required: ["IdPlan"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Plan retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  results: {
                    type: "array",
                    items: {
                      type: "object",
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
                    example: "Error getting plan.",
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

  "/postPlan": {
    post: {
      tags: ["Planes"],
      summary: "Create a new plan",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                plan: {
                  type: "object",
                  properties: {
                    IdAutor: { type: "integer" },
                    Titulo: { type: "string" },
                    Fecha: { type: "string", format: "date-time" },
                    ZonaHoraria: { type: "string" },
                    Duracion: { type: "string" },
                    Localizacion: { type: "string" },
                    AforoMaximo: { type: "integer" },
                    EdadMinima: { type: "integer" },
                    EdadMaxima: { type: "integer" },
                    Descripcion: { type: "string" },
                    PlanPrivado: { type: "boolean" },
                    DePago: { type: "boolean" },
                    Precio: { type: "number" },
                    FechaPublicacion: { type: "string", format: "date-time" },
                  },
                  required: [
                    "IdAutor",
                    "Titulo",
                    "Fecha",
                    "ZonaHoraria",
                    "Localizacion",
                    "FechaPublicacion",
                  ],
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Plan created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Plan posted correctly.",
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
                    example: "There are empty fields that must be fulfilled.",
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
                    example: "Error posting plan.",
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

  "/unirseAPlan": {
    post: {
      tags: ["Planes"],
      summary: "Unirse a un Plan",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                IdPlan: {
                  type: "integer",
                },
                IdUsuario: {
                  type: "integer",
                },
                Privado: {
                  type: "boolean",
                },
              },
              required: ["IdPlan", "IdUsuario", "Privado"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successfully joined plan",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Peticion/Union a plan correctly",
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
                    example: "Error uniendose a plan.",
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

  "/aceptarUnionAPlan": {
    post: {
      tags: ["Planes"],
      summary: "Aceptar unión a un Plan",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                IdUsuarioPlan: {
                  type: "integer",
                },
              },
              required: ["IdUsuarioPlan"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Union a plan aceptada correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Union a plan aceptada correctamente",
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
                    example: "Error aceptando unión a plan.",
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

  "/denegarUnionAPlan": {
    post: {
      tags: ["Planes"],
      summary: "Denegar unión a un Plan",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                IdUsuarioPlan: {
                  type: "integer",
                },
              },
              required: ["IdUsuarioPlan"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Unión a plan denegada correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Unión a plan denegada correctamente",
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
                    example: "Error denegando unión a plan.",
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
