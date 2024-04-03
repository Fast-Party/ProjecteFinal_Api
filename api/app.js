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
      res.status(401).json({ isAuthenticated: false });
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

// #endregion USUARIOS

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
