import mongoose from 'mongoose';

const contenidoSchema = mongoose.Schema(
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
    ]
},
{
    timeStamps: true
}
)
const Contenido = mongoose.model('Contenido', contenidoSchema);
export default Contenido;