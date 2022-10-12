import express from 'express';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import cors from 'cors';

const app = express();

conectarDB();

// const whitelist = ['http://127.0.0.1:5173', 'http://192.168.0.4'];
// const corsOptions = {
//     origin: function(origin, callback){
//         if(whitelist.includes(origin)){
//             callback(null, true);
//         }else{
//             callback(new Error('Error de CORS'));
//         }
//     }
// }

app.use(express.json());
app.use(cors());
app.use('/api/usuarios', usuarioRoutes);


app.listen(4000, ()=>{
    console.log('Servidor conectado al puerto 4000');
})

