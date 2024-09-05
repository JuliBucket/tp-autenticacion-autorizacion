import { generarJwt } from '../helpers/generar-jwt.js'
import { newConnection } from '../db/database.js';

export const session = (async(req, res) => {
  return res.json({ message: 'Acceso permitido a área protegida', user: req.user});
});

export const logIn = async (req, res) => {
  const { username, password } = req.body;
  console.log(username,password);
  try {
      const connection = await newConnection()
      const [user] = await connection.query(
          'SELECT * FROM users WHERE username = ? AND password = ?', 
          [username, password]
      );
      console.log(user);
      // Validación de usuario
      if (!user) {
          return res.status(401).json({ message: 'Credenciales incorrectas' });
      }

      // Generar token JWT
      const token = await generarJwt(user[0].id);

      // Almacenar el token en la sesión del servidor
      req.session.token = token;

      // Almacenar el token en una cookie segura
      res.cookie('authToken', token, {
          httpOnly: true, // La cookie no es accesible desde JavaScript
          secure: false, // Cambiar a true en producción con HTTPS
          maxAge: 3600000 // Expiración en milisegundos (1 hora)
      });

      return res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error Inesperado' });
  }
};

export const logout = (req, res) => {
  try {
      req.session.destroy(err => {
          if (err) {
              return res.status(500).json({ message: 'Error al cerrar sesión' });
          }

          res.clearCookie('authToken');
          return res.json({ message: 'Cierre de sesión exitoso' });
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error Inesperado' });
  }
};

export const register = async(req, res) =>{
  ctrl.register = async (req, res) =>{

    // Desestructuramos los datos que vienen del cuerpo de la peticion.
    const { username, password} = req.body;

    //Hacemos la conexion a la base de datos.
    const connection = await newConnection();

    // Creamos la consulta.
    const sql = 'INSERT INTO users (username, password) VALUES (?,?)';

    // Encriptamos la contraseña utilizando la libreria bcrypt.
    const hashContrasenia = bcrypt.hashSync(contraseña, 10); // El segundo parametro es el numero de veces que se ejecuta el algoritmo de encriptación.

    // Ejecutamos la consulta.
    await connection.query('INSERT INTO users (username, password) VALUES (?,?)', [username, hashContrasenia]);

    // Respondemos a nuestro cliente
    res.json({
        msg: 'Registrado correctamente'
    });
}
}