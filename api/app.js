const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "212.227.227.190",
  user: "fastparty",
  password: "ostrich69Party",
  database: "FastParty_Final",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to the database");
  }
});

// #region USUARIOS

app.post("/login", (req, res) => {
  try {
    const { NombreUsuario, Contrasenya } = req.body;

    if (!NombreUsuario || !Contrasenya) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const query =
      "SELECT IdUsuario FROM Usuarios WHERE NombreUsuario = ? AND Contrasenya = ?";
    db.query(query, [NombreUsuario, Contrasenya], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res.status(500).json("Error authenticating user.", err);
      }
      res.status(200).json(results);
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

app.post("/nombreUsuarioLibre", (req, res) => {
  try {
    const { NombreUsuario } = req.body;

    if (!NombreUsuario) {
      return res.status(400).json({ message: "Username is required." });
    }

    const query = "SELECT IdUsuario FROM Usuarios WHERE NombreUsuario = ?;";
    db.query(query, [NombreUsuario], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res.status(500).json("Error authenticating user.", err);
      }
      res.status(200).json(results);
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

app.post("/correoLibre", (req, res) => {
  try {
    const { Email } = req.body;

    if (!Email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const query = "SELECT IdUsuario FROM Usuarios WHERE Email = ?;";
    db.query(query, [Email], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res.status(500).json("Error authenticating user.", err);
      }
      res.status(200).json(results);
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

app.post("/registrarUsuario", (req, res) => {
  try {
    const {
      NombreUsuario,
      Nombre,
      Contrasenya,
      Email,
      Telefono,
      FechaNacimiento,
      Tipo,
    } = req.body;

    if (
      !NombreUsuario ||
      !Nombre ||
      !Contrasenya ||
      !Email ||
      !Telefono ||
      !FechaNacimiento ||
      !Tipo
    ) {
      return res.status(400).json({ message: "Fields are required." });
    }

    const query =
      "INSERT INTO Usuarios (NombreUsuario, Nombre, Contrasenya, Email, Telefono, FechaNacimiento, Tipo) VALUES (?,?,?,?,?,?,?)";
    db.query(
      query,
      [
        NombreUsuario,
        Nombre,
        Contrasenya,
        Email,
        Telefono,
        FechaNacimiento,
        Tipo,
      ],
      (err, results) => {
        if (err) {
          console.error("Error in database query:", err);
          return res
            .status(500)
            .json({ message: "Error registering user.", err });
        }
        res.status(200).json({ message: "User registered correctly." });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/buscarUsuarios", (req, res) => {
  try {
    const { NombreUsuario } = req.body;
    const Nombre = NombreUsuario + "%";

    const query = `SELECT u.IdUsuario, u.NombreUsuario, u.Nombre, u.Imagen, u.Telefono, u.Email
    (SELECT COUNT(s.IdSeguido) FROM Seguimientos s WHERE s.IdSeguido = u.IdUsuario) AS Seguidores, 
    AVG(p.Valoracion) AS Valoracion
    FROM Usuarios u
    LEFT JOIN Planes p ON u.IdUsuario = p.IdAutor
    WHERE u.NombreUsuario LIKE ?
    GROUP BY u.IdUsuario, u.NombreUsuario, u.Nombre, u.Imagen;`;
    db.query(query, [Nombre], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res
          .status(500)
          .json({ message: "Error searching for users.", err });
      }
      res.status(200).json({ results });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/perfilUsuario", (req, res) => {
  try {
    const { IdUsuario } = req.body;

    const query1 = `SELECT u.NombreUsuario, u.Nombre, u.Descripcion, u.FechaNacimiento, u.Imagen, 
                  u.CuentaPrivada, u.Verificado, 
                  (SELECT COUNT(s.IdSeguido) FROM Seguimientos s WHERE s.IdSeguido = u.IdUsuario) AS Seguidores, 
                  AVG(p.Valoracion) AS Valoracion
                  FROM Usuarios u 
                  LEFT JOIN Planes p ON u.IdUsuario = p.IdAutor
                  WHERE u.IdUsuario = ?`;

    const query2 = `SELECT * FROM Planes WHERE IdAutor = ?`;

    Promise.all([
      new Promise((resolve, reject) => {
        db.query(query1, [IdUsuario], (err, results) => {
          if (err) {
            console.error("Error in database query 1:", err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      }),
      new Promise((resolve, reject) => {
        db.query(query2, [IdUsuario], (err, results) => {
          if (err) {
            console.error("Error in database query 2:", err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      }),
    ])
      .then(([perfil, planes]) => {
        res.status(200).json({ perfil: perfil, planes: planes });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Error getting perfil de usuario.", err });
      });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/getInfoUsuarioLogged", (req, res) => {
  try {
    const { IdUsuario } = req.body;

    const query =
      "SELECT NombreUsuario, Email, Imagen FROM Usuarios WHERE IdUsuario = ?";
    db.query(query, [IdUsuario], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res.status(500).json({ message: "Error getting plan.", err });
      }
      res.status(200).json({ results });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/updatePerfilUsuario", (req, res) => {
  try {
    const usuario = req.body;
    const queryParams = [];
    let setClause = "";

    if (usuario.Descripcion !== undefined) {
      setClause += "Descripcion = ?, ";
      queryParams.push(usuario.Descripcion);
    }
    if (usuario.FechaNacimiento !== undefined) {
      setClause += "FechaNacimiento = ?, ";
      queryParams.push(usuario.FechaNacimiento);
    }
    if (usuario.Localidad !== undefined) {
      setClause += "Localidad = ?, ";
      queryParams.push(usuario.Localidad);
    }
    if (usuario.Imagen !== undefined) {
      setClause += "Imagen = ?, ";
      queryParams.push(usuario.Imagen);
    }
    if (usuario.CuentaPrivada !== undefined) {
      setClause += "CuentaPrivada = ?, ";
      queryParams.push(usuario.CuentaPrivada);
    }

    setClause = setClause.slice(0, -2);

    const query = `UPDATE Usuarios SET ${setClause} WHERE IdUsuario = ?`;

    queryParams.push(usuario.IdUsuario);

    db.query(query, queryParams, (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res
          .status(500)
          .json({ message: "Error searching for users.", err });
      }
      res.status(200).json({ results });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

// #endregion USUARIOS

// #region AUTORES

app.post("/perfilAutor", (req, res) => {
  try {
    const { IdAutor, IdUsuario } = req.body;

    const query1 = `SELECT u.NombreUsuario, u.Nombre, u.Descripcion, u.FechaNacimiento, u.Imagen,
                  u.CuentaPrivada, u.Verificado, u.Direccion, 
                  (SELECT JSON_ARRAYAGG(JSON_OBJECT('Ruta', li.Ruta, 'Orden', li.Orden))
                  FROM Locales_Imagenes li WHERE li.IdAutor = u.IdUsuario) AS ImagenesLocal,
                  (SELECT COUNT(IdPlan) AS PlanesCreados FROM Planes WHERE IdAutor = ? AND Fecha < now()) AS PlanesCreados,
                  (SELECT COUNT(s.IdSeguido) FROM Seguimientos s WHERE s.IdSeguido = u.IdUsuario) AS Seguidores, 
                  (SELECT IdSeguimiento FROM Seguimientos WHERE IdSeguidor = ? AND IdSeguido = ?) AS IsFollowing,
                  AVG(p.Valoracion) AS Valoracion
                  FROM Usuarios u 
                  LEFT JOIN Planes p ON u.IdUsuario = p.IdAutor
                  WHERE u.IdUsuario = ?;`;

    const query2 = `SELECT * FROM Planes WHERE IdAutor = ?`;

    Promise.all([
      new Promise((resolve, reject) => {
        db.query(query1, [IdAutor, IdUsuario, IdAutor, IdAutor], (err, results) => {
          if (err) {
            console.error("Error in database query 1:", err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      }),
      new Promise((resolve, reject) => {
        db.query(query2, [IdUsuario], (err, results) => {
          if (err) {
            console.error("Error in database query 2:", err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      }),
    ])
      .then(([perfil, planes]) => {
        res.status(200).json({
          perfil: perfil,
          planes: planes,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Error getting perfil de usuario.", err });
      });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

// #endregion AUTORES

// #region SEGUIMIENTOS

app.post("/getSeguidores", (req, res) => {
  try {
    const { IdUsuario } = req.body;

    const query = "SELECT IdSeguidor FROM Seguimientos WHERE IdSeguido = ?";
    db.query(query, [IdUsuario], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res
          .status(500)
          .json({ message: "Error getting seguidores.", err });
      }
      res.status(200).json({ results });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/getSeguidos", (req, res) => {
  try {
    const { IdUsuario } = req.body;

    const query = "SELECT IdSeguido FROM Seguimientos WHERE IdSeguidor = ?";
    db.query(query, [IdUsuario], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res
          .status(500)
          .json({ message: "Error getting seguidos.", err });
      }
      res.status(200).json({ results });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/seguirUsuario", (req, res) => {
  try {
    const { IdSeguidor, IdSeguido } = req.body;

    const query =
      "INSERT INTO Seguimientos (IdSeguidor, IdSeguido) VALUES (?,?)";
    db.query(query, [IdSeguidor, IdSeguido], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res.status(500).json({ message: "Error seguir usuario.", err });
      }
      res.status(200).json({ message: "Usuario segudio correctamente." });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/dejarDeSeguirUsuario", (req, res) => {
  try {
    const { IdSeguidor, IdSeguido } = req.body;

    const query =
      "DELETE FROM Seguimientos WHERE IdSeguidor = ? AND IdSeguido = ?";
    db.query(query, [IdSeguidor, IdSeguido], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res.status(500).json({ message: "Error seguir usuario.", err });
      }
      res
        .status(200)
        .json({ message: "Usuario dejado de seguir correctamente." });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

// #endregion SEGUIMIENTOS

// #region PLANES

/*app.get("/getPlanes", (req, res) => {
  try {
    const query = "SELECT * FROM Planes;";
    db.query(query, [], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res.status(404).json({ message: "Error getting planes.", err });
      }
      res.status(200).json({ results });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});*/

app.post("/getPlanes", (req, res) => {
  try {
    const { IdUsuario } = req.body;

    /*const query = `SELECT p.*, pi.Ruta, Usuario.NombreAutor, Usuario.LocalidadAutor, Usuario.Seguidores, Usuario.Rating AS RatingAutor, IsFollowing
    FROM Planes p LEFT JOIN Planes_Imagenes pi 
    ON p.IdPlan = pi.IdPlan, 
    (SELECT u.IdUsuario, u.NombreUsuario AS NombreAutor, u.Localidad AS LocalidadAutor,
    (SELECT COUNT(s.IdSeguido) FROM Seguimientos s WHERE s.IdSeguido = u.IdUsuario) AS Seguidores,
    (SELECT AVG(p.Valoracion) FROM Planes p WHERE p.IdAutor = u.IdUsuario) AS Rating,
    (SELECT IdSeguimiento FROM Seguimientos WHERE IdSeguidor = ? AND IdSeguido = u.IdUsuario) AS IsFollowing
    FROM Usuarios u LEFT JOIN Seguimientos s
    ON u.IdUsuario = s.IdSeguido
    GROUP BY u.IdUsuario) AS Usuario
    WHERE p.IdAutor = Usuario.IdUsuario;`;*/
    const query = `SELECT p.*, pi.Ruta AS RutaImagenPlan, Usuario.IdUsuario, Usuario.NombreAutor, Usuario.LocalidadAutor, Usuario.Seguidores, Usuario.Rating AS RatingAutor, Usuario.IsFollowing, ImagenLogoAutor, Usuario.Verificado
    FROM Planes p LEFT JOIN (
      SELECT u.IdUsuario, u.NombreUsuario AS NombreAutor, u.Direccion AS LocalidadAutor, u.Imagen AS ImagenLogoAutor, u.Verificado,
        (SELECT COUNT(s.IdSeguido) FROM Seguimientos s WHERE s.IdSeguido = u.IdUsuario) AS Seguidores,
        (SELECT AVG(p.Valoracion) FROM Planes p WHERE p.IdAutor = u.IdUsuario) AS Rating,
        (SELECT IdSeguimiento FROM Seguimientos WHERE IdSeguidor = ? AND IdSeguido = u.IdUsuario) AS IsFollowing
      FROM Usuarios u
      GROUP BY u.IdUsuario) AS Usuario ON p.IdAutor = Usuario.IdUsuario
    LEFT JOIN ( 
      SELECT pi.IdPlan, pi.Ruta 
      FROM Planes_Imagenes pi
      WHERE pi.Orden = 1) AS pi ON p.IdPlan = pi.IdPlan
    WHERE p.IdAutor = Usuario.IdUsuario
    ORDER BY p.IdPlan;`;
    db.query(query, [IdUsuario], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res.status(404).json({ message: "Error getting planes.", err });
      }
      res.status(200).json({ results });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/getPlanesAutoresSeguidos", (req, res) => {
  try {
    const { IdUsuario } = req.body;

    /*const query = `SELECT p.*, pi.Ruta, Usuario.NombreAutor, Usuario.LocalidadAutor, Usuario.Seguidores, Usuario.Rating AS RatingAutor, IsFollowing
    FROM Planes p LEFT JOIN Planes_Imagenes pi 
    ON p.IdPlan = pi.IdPlan, 
    (SELECT u.IdUsuario, u.NombreUsuario AS NombreAutor, u.Localidad AS LocalidadAutor,
    (SELECT COUNT(s.IdSeguido) FROM Seguimientos s WHERE s.IdSeguido = u.IdUsuario) AS Seguidores,
    (SELECT AVG(p.Valoracion) FROM Planes p WHERE p.IdAutor = u.IdUsuario) AS Rating,
    (SELECT IdSeguimiento FROM Seguimientos WHERE IdSeguidor = ? AND IdSeguido = u.IdUsuario) AS IsFollowing
    FROM Usuarios u LEFT JOIN Seguimientos s
    ON u.IdUsuario = s.IdSeguido
    GROUP BY u.IdUsuario) AS Usuario
    WHERE p.IdAutor = Usuario.IdUsuario;`;*/
    const query = `SELECT p.*, pi.Ruta AS RutaImagenPlan, Usuario.IdUsuario, Usuario.NombreAutor, Usuario.LocalidadAutor, Usuario.Seguidores, Usuario.Rating AS RatingAutor, Usuario.IsFollowing, ImagenLogoAutor, Usuario.Verificado
    FROM Planes p LEFT JOIN (
      SELECT u.IdUsuario, u.NombreUsuario AS NombreAutor, u.Localidad AS LocalidadAutor, u.Imagen AS ImagenLogoAutor, u.Verificado,
        (SELECT COUNT(s.IdSeguido) FROM Seguimientos s WHERE s.IdSeguido = u.IdUsuario) AS Seguidores,
        (SELECT AVG(p.Valoracion) FROM Planes p WHERE p.IdAutor = u.IdUsuario) AS Rating,
        (SELECT IdSeguimiento FROM Seguimientos WHERE IdSeguidor = ? AND IdSeguido = u.IdUsuario) AS IsFollowing
      FROM Usuarios u
      GROUP BY u.IdUsuario) AS Usuario ON p.IdAutor = Usuario.IdUsuario
    LEFT JOIN ( 
      SELECT pi.IdPlan, pi.Ruta 
      FROM Planes_Imagenes pi
      WHERE pi.Orden = 1) AS pi ON p.IdPlan = pi.IdPlan
    WHERE p.IdAutor = Usuario.IdUsuario AND Usuario.IsFollowing IS NOT NULL
    ORDER BY p.IdPlan;`;
    db.query(query, [IdUsuario], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res.status(404).json({ message: "Error getting planes.", err });
      }
      res.status(200).json({ results });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/getMisPlanes", (req, res) => {
  try {
    const { IdUsuario } = req.body;

    const query = `SELECT p.*, pi.Ruta AS RutaImagenPlan, Usuario.IdUsuario, Usuario.NombreAutor, Usuario.LocalidadAutor, Usuario.Seguidores, Usuario.Rating AS RatingAutor, Usuario.IsFollowing, ImagenLogoAutor, Usuario.Verificado
    FROM Planes p LEFT JOIN (
      SELECT u.IdUsuario, u.NombreUsuario AS NombreAutor, u.Localidad AS LocalidadAutor, u.Imagen AS ImagenLogoAutor, u.Verificado,
        (SELECT COUNT(s.IdSeguido) FROM Seguimientos s WHERE s.IdSeguido = u.IdUsuario) AS Seguidores,
        (SELECT AVG(p.Valoracion) FROM Planes p WHERE p.IdAutor = u.IdUsuario) AS Rating,
        (SELECT IdSeguimiento FROM Seguimientos WHERE IdSeguidor = ? AND IdSeguido = u.IdUsuario) AS IsFollowing
      FROM Usuarios u
      GROUP BY u.IdUsuario) AS Usuario ON p.IdAutor = Usuario.IdUsuario
    LEFT JOIN ( 
      SELECT pi.IdPlan, pi.Ruta 
      FROM Planes_Imagenes pi
      WHERE pi.Orden = 1) AS pi ON p.IdPlan = pi.IdPlan
    WHERE p.IdAutor = Usuario.IdUsuario AND p.IdPlan IN (SELECT up.IdPlan
		FROM Usuarios_Planes up
		WHERE up.IdUsuario = ?)
    ORDER BY p.IdPlan;`;
    db.query(query, [IdUsuario, IdUsuario], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res.status(404).json({ message: "Error getting planes.", err });
      }
      res.status(200).json({ results });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/getPlanesDeAutor", (req, res) => {
  try {
    const { IdAutor } = req.body;

    const query = `SELECT p.*, pi.Ruta AS RutaImagenPlan FROM FastParty_Final.Planes p
    LEFT JOIN(
      SELECT pi.IdPlan, pi.Ruta FROM  FastParty_Final.Planes_Imagenes pi WHERE pi.Orden = 1) pi ON p.IdPlan = pi.IdPlan
    WHERE p.IdAutor = ? ORDER BY p.Fecha DESC;`;
    db.query(query, [IdAutor], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res.status(500).json({ message: "Error getting planes.", err });
      }
      res.status(200).json({ results });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/getPlanesDeUsuario", (req, res) => {
  try {
    const { IdUsuario } = req.body;

    const query = "SELECT * FROM Planes WHERE IdAutor = ? ORDER BY Fecha desc;";
    db.query(query, [IdUsuario], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res.status(500).json({ message: "Error getting planes.", err });
      }
      res.status(200).json({ results });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/getPlanById", (req, res) => {
  try {
    const { IdPlan, IdUsuario } = req.body;

    const query = `SELECT p.*, JSON_ARRAYAGG(JSON_OBJECT('Ruta', pi.Ruta, 'Orden', pi.Orden)) AS Imagenes, u.NombreUsuario AS NombreAutor, u.Imagen AS ImagenLogoAutor,
    (SELECT IdEstado FROM Usuarios_Planes WHERE IdPlan = ? AND IdUsuario = ?) AS IdEstado
    FROM Planes p
    LEFT JOIN Planes_Imagenes pi ON p.IdPlan = pi.IdPlan
    LEFT JOIN Usuarios u ON u.IdUsuario = p.IdAutor
    WHERE p.IdPlan = ?
    GROUP BY p.IdPlan;`;
    db.query(query, [IdPlan, IdUsuario, IdPlan], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res.status(500).json({ message: "Error getting plan.", err });
      }
      res.status(200).json({ results });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/postPlan", (req, res) => {
  const plan = req.body;

  if (
    plan.IdAutor == null ||
    plan.Titulo == null ||
    plan.Fecha == null ||
    plan.ZonaHoraria == null ||
    plan.Localizacion == null
  ) {
    return res
      .status(400)
      .json({ message: "There are empty fields that must be fullfiled." });
  }

  const query = `INSERT INTO Planes (IdAutor, Titulo, Fecha, ZonaHoraria, Duracion, Localizacion, 
      AforoMaximo, EdadMinima, EdadMaxima, Descripcion, PlanPrivado, DePago, Precio)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);
    `;
  db.query(
    query,
    [
      plan.IdAutor,
      plan.Titulo,
      plan.Fecha,
      plan.ZonaHoraria,
      plan.Duracion,
      plan.Localizacion,
      plan.AforoMaximo,
      plan.EdadMinima,
      plan.EdadMaxima,
      plan.Descripcion,
      plan.PlanPrivado,
      plan.DePago,
      plan.Precio,
    ],
    (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res.status(500).json({ message: "Error posting plan.", err });
      }
      res.status(200).json({ message: "Plan posted correctly." });
    }
  );
});

app.post("/unirseAPlan", (req, res) => {
  try {
    const { IdUsuario, IdPlan, Privado } = req.body;

    let estado = 0;

    if (Privado === true) {
      estado = 1;
    } else {
      estado = 2;
    }

    const query = `INSERT INTO Usuarios_Planes (IdUsuario, IdPlan, IdEstado) 
  VALUES (?,?,?)
  `;
    db.query(query, [IdUsuario, IdPlan, estado], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res
          .status(500)
          .json({ message: "Error uniendose a plan.", err });
      }
      res.status(200).json({ message: "Peticion/Union a plan correctly" });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/aceptarUnionAPlan", (req, res) => {
  try {
    const { IdUsuarioPlan } = req.body;

    const query =
      "UPDATE Usuarios_Planes SET IdEstado = 2 WHERE IdUsuarioPlan = ?";
    db.query(query, [IdUsuarioPlan], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res
          .status(500)
          .json({ message: "Error aceptando union a plan.", err });
      }
      res.status(200).json({ message: "Union a plan aceptada correctly" });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/denegarUnionAPlan", (req, res) => {
  try {
    const { IdUsuario, IdPlan } = req.body;

    const query = "DELETE FROM Usuarios_Planes WHERE IdUsuario = ? AND IdPlan = ?;";
    db.query(query, [IdUsuario, IdPlan], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res
          .status(500)
          .json({ message: "Error denegando union a plan.", err });
      }
      res.status(200).json({ message: "Union a plan denegada correctly" });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

// #endregion PLANES

// #region CATEGORIAS I SUBCATEGORIAS

app.get("/getCategoriasISubcategorias", (req, res) => {
  try {
    const query1 = "SELECT * FROM Categorias;";
    const query2 = "SELECT * FROM Subcategorias ORDER BY IdCategoria;";

    Promise.all([
      new Promise((resolve, reject) => {
        db.query(query1, (err, results) => {
          if (err) {
            console.error("Error in database query 1:", err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      }),
      new Promise((resolve, reject) => {
        db.query(query2, (err, results) => {
          if (err) {
            console.error("Error in database query 2:", err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      }),
    ])
      .then(([categorias, subcategorias]) => {
        res
          .status(200)
          .json({ categorias: categorias, subcategorias: subcategorias });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Error getting categorias i subcategorias.", err });
      });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/postInteresCategoria", (req, res) => {
  try {
    const { IdUsuario, IdCategoria } = req.body;

    if (!IdUsuario || !IdCategoria) {
      return res.status(400).json({ message: "Fields are required." });
    }

    const query =
      "INSERT INTO Intereses_Usuarios_Categorias (IdUsuario, IdCategoria) VALUES (?,?)";
    db.query(query, [IdUsuario, IdCategoria], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res
          .status(500)
          .json({ message: "Error posting interes categoria.", err });
      }
      res.status(200).json({ message: "Interes posted correctly." });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/postInteresSubcategoria", (req, res) => {
  try {
    const { IdUsuario, IdSubcategoria } = req.body;

    if (!IdUsuario || !IdSubcategoria) {
      return res.status(400).json({ message: "Fields are required." });
    }

    const query =
      "INSERT INTO Intereses_Usuarios_Subcategorias (IdUsuario, IdSubcategoria) VALUES (?,?)";
    db.query(query, [IdUsuario, IdSubcategoria], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res
          .status(500)
          .json({ message: "Error posting interes subcategoria.", err });
      }
      res.status(200).json({ message: "Interes posted correctly." });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/deleteInteresCategoria", (req, res) => {
  try {
    const { IdUsuario, IdCategoria } = req.body;

    if (!IdUsuario || !IdCategoria) {
      return res.status(400).json({ message: "Fields are required." });
    }

    const query =
      "DELETE FROM Intereses_Usuarios_Categorias WHERE IdUsuario = ? AND IdCategoria = ?";
    db.query(query, [IdUsuario, IdCategoria], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res
          .status(500)
          .json({ message: "Error deleting interes categoria.", err });
      }
      res.status(200).json({ message: "Interes deleted correctly." });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

app.post("/deleteInteresSubcategoria", (req, res) => {
  try {
    const { IdUsuario, IdSubcategoria } = req.body;

    if (!IdUsuario || !IdSubcategoria) {
      return res.status(400).json({ message: "Fields are required." });
    }

    const query =
      "DELETE FROM Intereses_Usuarios_Subcategorias WHERE IdUsuario = ? AND IdSubcategoria = ?";
    db.query(query, [IdUsuario, IdSubcategoria], (err, results) => {
      if (err) {
        console.error("Error in database query:", err);
        return res
          .status(500)
          .json({ message: "Error deleting interes categoria.", err });
      }
      res.status(200).json({ message: "Interes deleted correctly." });
    });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

// #endregion CATEGORIAS I SUBCATEGORIAS

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
