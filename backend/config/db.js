import mongoose from "mongoose";

const conectarDB = async ()=>{
    try {
        const connection = await mongoose.connect('mongodb+srv://taco:root@cluster0.xdoaq.mongodb.net/aureos?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const url = `${connection.connection.name}: ${connection.connection.port}`;
        console.log(`DB conectada en ${url}`);
    } catch (error) {   
        console.log('Error en la conexión');
    }
}

export default conectarDB;