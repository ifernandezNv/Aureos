import express from 'express';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import cors from 'cors';

const app = express();

conectarDB();


app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);

app.listen(4000, ()=>{
    console.log('Servidor conectado al puerto 4000');
})

