import { SECRET_KEY } from "./env.js";
export const PORT = process.env.PORT || 4000;
export const EXPRESS_SESSION = SECRET_KEY;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PASSWORD =  ""
export const DB_NAME = "db_system"
export const DB_USER = "root"