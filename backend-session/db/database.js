import mysql2 from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../config/config.js";

export const newConnection = async () => {
  try {
    const connection = await mysql2.createConnection({
      host: DB_HOST,
      user: DB_USER,
      database: DB_NAME,
      password: DB_PASSWORD,
    });
    await connection.connect();
    console.log("conectado a la base de datos correctamente");
    return connection;
  } catch (error) {
    console.log("Error al conectarse a la base de datos");
  }
};
// export const connection = newConnection()