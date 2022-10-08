import express from 'express';
import Usuario from '../models/usuario.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';

const registrarUsuario = async (req, res) =>{
    const {email} = req.body;
    const usuarioExistente = await Usuario.findOne({email});
    if(usuarioExistente){
        return res.status(403).json({msg: 'El usuario ya existe'});
    }
    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        await usuario.save();
        res.json(usuario);
    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (req, res) => {
    const {email, password} = req.body;
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    const {confirmado} = usuario;
    if(!confirmado){
        const error = new Error('Tu cuenta no está verificada');
        return res.status(403).json({msg: error.message});
    }
    if(await usuario.comprobarPassword(password)){
        return res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        });
    }else{
        const error = new Error('Password incorrecto');
        return res.status(403).json({msg: error.message});
    }
}

const confirmarCuenta = async (req, res) => {
    const {token} = req.params;
    const usuarioEncontrado = await Usuario.findOne({token});
    if(!usuarioEncontrado){
        const error = new Error('Token no válido');
        return res.status(403).json({msg: error.message});
    }
    try {
        usuarioEncontrado.confirmado = true;
        usuarioEncontrado.token = '';
        await usuarioEncontrado.save();
        return res.json({msg: 'Cuenta Autenticada Correctamente'});
    } catch (error) {
        console.log(error);
    }

}

const olvidePassword = async (req, res)=>{
    const {email} = req.body;
    const usuarioEncontrado = await Usuario.findOne({email});
    if(!usuarioEncontrado){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    try {
        usuarioEncontrado.token = generarId();
        await usuarioEncontrado.save();
        return res.json({msg: 'Se envió un correo con las isntrucciones para reestablecer tu password'});   
    } catch (error) {
        console.log(error);
    }
}

const comprobarToken = async (req, res) =>{
    const {token} = req.params;
    const usuarioEncontrado = await Usuario.findOne({token});
    if(!usuarioEncontrado){
        const error = new Error('Token no válido');
        return res.status(403).json({msg: error.message});
    }
    return res.json({msg: 'Token válido'})
}
const cambiarPassword = async (req, res) =>{
    const {password} = req.body;
    const {token} = req.params;
    const usuarioEncontrado = await Usuario.findOne({token});
    if(!usuarioEncontrado){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    try {
        usuarioEncontrado.token = '';
        usuarioEncontrado.password = password;
        await usuarioEncontrado.save();
        return res.json({msg: 'Password modificado correctamente'});
    } catch (error) {
        
    }
}

export {
    registrarUsuario,
    autenticar,
    confirmarCuenta,
    olvidePassword,
    comprobarToken,
    cambiarPassword
}