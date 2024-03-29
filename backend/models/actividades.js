import mongoose from 'mongoose';

const actividadesSchema = mongoose.Schema(
{
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    instrucciones: {
        type: String,
        trim: true
    },
    categoria: [
        {
            type: String,
            required: true,
        }
    ],
    duracion: {
        type: Number,
        required: true
    },
    imagen: {
        type: Object,
        trim: true
    },
    identificador: {
        type: Number,
        default: Date.now()
    },
    creadaPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    completadaPor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        },
    ],
    contenido:{
        type: String,
        trim: true
    }
},
{
    timeStamps: true
}
)
const Actividades = mongoose.model('Actividades', actividadesSchema);
export default Actividades;