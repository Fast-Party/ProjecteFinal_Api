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
  const { NombreUsuario, Contrasenya } = req.body;

  if (!NombreUsuario || !Contrasenya) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const query =
    "SELECT IdUsuario, NombreUsuario FROM Usuarios WHERE NombreUsuario = ? AND Contrasenya = ?";
  db.query(query, [NombreUsuario, Contrasenya], (err, results) => {
    if (err) {
      console.error("Error in database query:", err);
      return res.status(500).json("Error authenticating user.", err);
    }
    if (results.length > 0) {
      res.status(200).json({ isAuthenticated: true });
    } else {
      res.status(404).json({ isAuthenticated: false });
    }
  });
});

app.post("/registrarUsuario", (req, res) => {
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
});

app.post("/buscarUsuarios", (req, res) => {
  const { NombreUsuario } = req.body;
  const Nombre = NombreUsuario + "%";

  const query = `SELECT u.IdUsuario, u.NombreUsuario, u.Nombre, u.Imagen, 
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
});

app.post("/perfilUsuario", (req, res) => {
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
});

// #endregion USUARIOS

// #region SEGUIMIENTOS

app.post("/getSeguidores", (req, res) => {
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
});

app.post("/getSeguidos", (req, res) => {
  const { IdUsuario } = req.body;

  const query = "SELECT IdSeguido FROM Seguimientos WHERE IdSeguidor = ?";
  db.query(query, [IdUsuario], (err, results) => {
    if (err) {
      console.error("Error in database query:", err);
      return res.status(500).json({ message: "Error getting seguidos.", err });
    }
    res.status(200).json({ results });
  });
});

app.post("/seguirUsuario", (req, res) => {
  const { IdSeguidor, IdSeguido } = req.body;

  const query = "INSERT INTO Seguimientos (IdSeguidor, IdSeguido) VALUES (?,?)";
  db.query(query, [IdSeguidor, IdSeguido], (err, results) => {
    if (err) {
      console.error("Error in database query:", err);
      return res.status(500).json({ message: "Error seguir usuario.", err });
    }
    res.status(200).json({ message: "Usuario segudio correctamente." });
  });
});

app.post("/dejarDeSeguirUsuario", (req, res) => {
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
});

// #endregion SEGUIMIENTOS

/*
  ! Revisar POST PLAN
*/
// #region PLANES

app.get("/getPlanes", (req, res) => {
  const query = "SELECT * FROM Planes;";
  db.query(query, [], (err, results) => {
    if (err) {
      console.error("Error in database query:", err);
      return res.status(500).json({ message: "Error getting planes.", err });
    }
    res.status(200).json({ results });
  });
});

app.post("/getPlanesDeUsuario", (req, res) => {
  const { IdUsuario } = req.body;

  const query = "SELECT * FROM Planes WHERE IdAutor = ? ORDER BY Fecha desc;";
  db.query(query, [IdUsuario], (err, results) => {
    if (err) {
      console.error("Error in database query:", err);
      return res.status(500).json({ message: "Error getting planes.", err });
    }
    res.status(200).json({ results });
  });
});

app.post("/getPlanById", (req, res) => {
  const { IdPlan } = req.body;

  const query = "SELECT * FROM Planes WHERE IdPlan = ?";
  db.query(query, [IdPlan], (err, results) => {
    if (err) {
      console.error("Error in database query:", err);
      return res.status(500).json({ message: "Error getting plan.", err });
    }
    res.status(200).json({ results });
  });
});
/*
app.post("/postPlan", (req, res) => {
  const {
    IdAutor,
    Titulo,
    Fecha,
    ZonaHoraria,
    Duracion,
    Localizacion,
    AforoMaximo,
    EdadMinima,
    EdadMaxima,
    Descripcion,
    PlanPrivado,
    DePago,
    Precio,
    FechaPublicacion,
  } = req.body;

  if (
    !IdAutor ||
    !Titulo ||
    !Fecha ||
    !ZonaHoraria ||
    !Localizacion ||
    !FechaPublicacion
  ) {
    return res
      .status(400)
      .json({ message: "There are empty fields that must be fullfiled." });
  }

  const query = `INSERT INTO Planes (IdAutor, Titulo, Fecha, ZonaHoraria, Duracion, Localizacion, 
      AforoMaximo, EdadMinima, EdadMaxima, Descripcion, PlanPrivado, DePago, Precio, FechaPublicacion)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);
    `;
  db.query(
    query,
    [
      IdAutor,
      Titulo,
      Fecha,
      ZonaHoraria,
      Duracion,
      Localizacion,
      AforoMaximo,
      EdadMinima,
      EdadMaxima,
      Descripcion,
      PlanPrivado,
      DePago,
      Precio,
      FechaPublicacion,
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
*/

app.post("/unirseAPlan", (req, res) => {
  const { IdPlan, IdUsuario, Privado } = req.body;

  let estado = 0;

  if (Privado === true) {
    estado = 1;
  } else {
    estado = 2;
  }

  const query = `INSERT INTO Usuarios_Planes (IdUsuario, IdPlan, IdEstado) 
  VALUES (?,?,?)
  `;
  db.query(query, [IdPlan, IdUsuario, estado], (err, results) => {
    if (err) {
      console.error("Error in database query:", err);
      return res.status(500).json({ message: "Error uniendose a plan.", err });
    }
    res.status(200).json({ message: "Peticion/Union a plan correctly" });
  });
});

app.post("/aceptarUnionAPlan", (req, res) => {
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
});

app.post("/denegarUnionAPlan", (req, res) => {
  const { IdUsuarioPlan } = req.body;

  const query = "DELETE FROM Usuarios_Planes WHERE IdUsuarioPlan = ?";
  db.query(query, [IdUsuarioPlan], (err, results) => {
    if (err) {
      console.error("Error in database query:", err);
      return res
        .status(500)
        .json({ message: "Error denegando union a plan.", err });
    }
    res.status(200).json({ message: "Union a plan denegada correctly" });
  });
});

// #endregion PLANES

// #region CATEGORIAS I SUBCATEGORIAS

app.get("/getCategoriasISubcategorias", (req, res) => {
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
});

app.post("/postInteresCategoria", (req, res) => {
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
});

app.post("/postInteresSubcategoria", (req, res) => {
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
});

app.post("/deleteInteresCategoria", (req, res) => {
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
});

app.post("/deleteInteresSubcategoria", (req, res) => {
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
});

// #endregion CATEGORIAS I SUBCATEGORIAS

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
