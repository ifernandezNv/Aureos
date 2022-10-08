import express from 'express';
import {
    registrarUsuario,
    autenticar,
    confirmarCuenta,
    olvidePassword,
    comprobarToken,
    cambiarPassword,
}
from '../controllers/usuarioController.js';
const router = express.Router();

router.post('/', registrarUsuario);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmarCuenta)
router.post('/olvide-password', olvidePassword)
router.route('/olvide-password/:token')
    .get(comprobarToken)    
    .post(cambiarPassword);
    
export default router;