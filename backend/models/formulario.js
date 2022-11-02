import mongoose from 'mongoose';

const formularioSchema = mongoose.Schema(
{
    respuestas: [
        {
            texto: {
                type: String,
                required: true,
                trim: true
            },
            valor: {
                type: Number,
                required: true,
                trim: true,
            },
            identificador: {
                type: String,
                required: true,
                trim: true
            },
        }
    ],
    patologia: {
        type: Number,
        trim: true
    },
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}
)
const Formulario = mongoose.model('Formulario', formularioSchema);
export default Formulario;