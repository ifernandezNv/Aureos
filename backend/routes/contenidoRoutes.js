import express from 'express';
import checkAuth from '../middleware/checkAuth.js';

import { 
    obtenerContenido,
    obtenerContenidoCategoria,
    crearContenido
} from '../controllers/contenidoController.js';


const router = express.Router();

router.route('/')
    .get(checkAuth, obtenerContenido)
    .post(obtenerContenidoCategoria)

router.put('/editar/:id', checkAuth, editarActividad);
router.post('/borrar/:id', checkAuth, eliminarActividad);

router.route('/:id')
    .get(checkAuth, obtenerActividad)
    .put(checkAuth, completarActividad)

router.get('/completado/:id', checkAuth, verActividadesCompletadas);

router.post('/crear-contenido', checkAuth, crearContenido);



export default router;