import express from 'express';
import checkAuth from '../middleware/checkAuth.js';

import { 
    crearActividad, 
    obtenerActividadesCategoria, 
    obtenerActividadesGeneral, 
    obtenerActividadesCreadas, 
    obtenerActividad, 
    completarActividad,
    verActividadesCompletadas
} from '../controllers/actividadesController.js';

const router = express.Router();

router.route('/')
    .get(checkAuth, obtenerActividadesGeneral)
    .post(obtenerActividadesCategoria);

router.route('/:id')
    .get(checkAuth, obtenerActividad)
    .put(checkAuth, completarActividad);


router.post('/creadas', checkAuth, obtenerActividadesCreadas);
router.get('/completadas/:id', checkAuth, verActividadesCompletadas);

router.post('/crear-actividad', checkAuth, crearActividad);



export default router;