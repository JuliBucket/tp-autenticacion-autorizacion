import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/env.js';

export const generarJwt = ( userId ) => {
    return new Promise( ( resolve, reject ) => {
        console.log("llegó :v", userId);
        const payload = { userId };
        jwt.sign( payload, SECRET_KEY, {
            expiresIn: '4h'
        }, ( error, token ) => {
            if ( error ) {
                
                reject( 'No se pudo generar el token' );
            } else {
                resolve( token );
            }
        } );
});
}