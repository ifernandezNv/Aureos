import express from 'express';
import {
    registrarUsuario,
    autenticar,
    confirmarCuenta,
    olvidePassword,
    comprobarToken,
    cambiarPassword,
    perfil
}
from '../controllers/usuarioController.js';

import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();

router.post('/', registrarUsuario);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmarCuenta)
router.post('/olvide-password', olvidePassword)
router.route('/olvide-password/:token')
    .get(comprobarToken)    
    .post(cambiarPassword);

router.get('/perfil', checkAuth, perfil)
    
export default router;