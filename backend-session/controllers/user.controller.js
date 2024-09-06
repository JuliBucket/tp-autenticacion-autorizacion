import { newConnection } from "../db/database.js";


export const register = async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res
    .status(400)
    .json({ message: "Todos los campos son obligatorios" });
  }
  
  const connection = await newConnection()
  try {
    const [result] = await connection.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, password]
    );
    console.log(result);
    return res.status(201).json({
      message: "Usuario registrado con éxito",
      userId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const connection = await newConnection()

    const [[user]] = await connection.query(
      "SELECT * FROM USERS WHERE USERNAME = ? AND PASSWORD = ? LIMIT 1",
      [username, password]
    );

    if (user) {
        req.session.userId = user.id;
        req.session.username = user.username;

        return res.json({ 
            message: 'Inicio de sesión exitoso', 
            user: { id: user.id, username: user.username } });
    } else {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.log(error);
    res.json("error")
  }
};

export const session = async (req, res) => {
  if (req.session.userId) {
    return res.json({ 
        loggedIn: true, 
        user: { id: req.session.userId, username: req.session.username } });
} else {
    return res.status(401).json({ loggedIn: false, message: 'No hay sesión activa' });
}
};

export const logOut = async (req, res) => {
  console.log(req.session)
  req.session.destroy(err => {
      if (err) {
          return res.status(500).json({ message: 'Error al cerrar la sesión' });
      }
      res.clearCookie('connect.sid'); // Nombre de cookie por defecto para express-session
      return res.json({ message: 'Sesión cerrada exitosamente' });
  });
};
