import express from 'express';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import formularioRoutes from './routes/formularioRoutes.js';
import actividadesRoutes from './routes/actividadesRoutes.js';
import * as dotenv from 'dotenv';

dotenv.config();

import cors from 'cors';

const app = express();
conectarDB();

app.use(express.json());
app.use(cors());
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/formulario', formularioRoutes);
app.use('/api/actividades', actividadesRoutes);

app.listen(4000, ()=>{
    console.log('Servidor conectado al puerto 4000');
})
