import express from 'express';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import formularioRoutes from './routes/formularioRoutes.js';
import actividadesRoutes from './routes/actividadesRoutes.js';
import {Server} from 'socket.io';
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
const servidor = app.listen(4000, ()=>{
    console.log('Servidor conectado al puerto 4000');
})

const io = new Server(servidor, {
    pingTimeout: 6000,
});

io.on('connection', (socket) => {
    console.log('Conectado al servidor y socket.io está funcionando');
    socket.on('nueva actividad', (actividad)=>{
        socket.to(actividad).emit('actividad agregada correctamente', actividad);
    });
})

