import mysql2 from "mysql2/promise";

export const newConnection = async () => {
  try {
    const connection = await mysql2.createConnection({
      host: "localhost",
      user: "root",
      database: "db_system",
      password: "",
    });
    await connection.connect();
    console.log("conectado a la base de datos correctamente");
    return connection;
  } catch (error) {
    console.log("Error al conectarse a la base de datos");
  }
};
