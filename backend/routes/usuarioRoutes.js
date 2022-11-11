import express from 'express';
import {
    registrarUsuario,
    autenticar,
    confirmarCuenta,
    olvidePassword,
    comprobarToken,
    cambiarPassword,
    perfil,
    obtenerTodosUsuarios,
    obtenerSoloUsuarios,
    eliminarUsuario
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
router.delete('/eliminar/:id', checkAuth, eliminarUsuario);
router.get('/perfil', checkAuth, perfil)

router.get('/todos', checkAuth, obtenerTodosUsuarios);
router.get('/', checkAuth, obtenerSoloUsuarios);

export default router;