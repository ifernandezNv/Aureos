import express from 'express';
import checkAuth from '../middleware/checkAuth.js';

import { registrarRespuestas, verificarEnvioFormulario, buscarPatologiaUsuario } from '../controllers/formularioController.js';

const router = express.Router();

router.post('/', checkAuth, verificarEnvioFormulario);
router.post('/enviar-formulario', checkAuth, registrarRespuestas);
router.post('/buscar-patologia', checkAuth, buscarPatologiaUsuario);


export default router;