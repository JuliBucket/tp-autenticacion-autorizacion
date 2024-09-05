import { Router } from "express";
import { session, logIn, logout, register} from "../controllers/user.controller.js";
import { validarJwt } from '../middlewares/validar-jwt.js';

const router = Router()

// Endpoint de inicio de sesión (login)
router.post('/login', logIn)

// Endpoint para validar la sesión
router.get('/session', validarJwt, session);

// Endpoint de cierre de sesión (logout)
router.post('/logout', logout)

//Endpoint de registro
router.post('/register', register)


export default router;