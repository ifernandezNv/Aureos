import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const usuarioSchema = mongoose.Schema(
{
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    confirmado: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        trim: true
    }
},
{
    timeStamps: true
}
);
usuarioSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function(passwordEnviado){
    return await bcrypt.compare(passwordEnviado, this.password);
}


const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;