import {StreamChat} from 'stream-chat';
import Usuario from '../models/usuario.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';

import * as dotenv from 'dotenv';

import { emailRegistro, cambiarContrasenia } from '../helpers/emails.js';

dotenv.config();

const serverClient = StreamChat.getInstance(process.env.STREAM_KEY, process.env.STREAM_SECRET);

const registrarUsuario = async (req, res) =>{
    const {email} = req.body;
    const usuarioExistente = await Usuario.findOne({email});
    if(usuarioExistente){
        return res.status(403).json({msg: 'El usuario ya existe'});
    }
    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        emailRegistro({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token,
        })
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
            token: generarJWT(usuario._id),
            tipo: 'usuario'
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
        cambiarContrasenia({
            email: usuarioEncontrado.email,
            token: usuarioEncontrado.token,
            nombre: usuarioEncontrado.nombre,
        })
        await usuarioEncontrado.save();
        return res.json({msg: 'Se envió un correo con las instrucciones para reestablecer tu password'});   
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
        console.log(error);       
    }
}

const perfil = async (req, res)=>{
    const {usuario} = req;
    usuario.tokenStream = serverClient.createToken(usuario._id.toString());
    res.json(usuario);
}

const obtenerTodosUsuarios = async (req,res) => {
    const usuarios = await Usuario.find();
    if(!usuarios){
        const error = new Error('No hay usuarios registrados');
        return res.status(404).json({msg: error.message});
    }
    try {
        await res.json(usuarios);
    } catch (error) {
        console.log(error);
    }
}
const obtenerSoloUsuarios = async (req, res) => {
    const usuarios = await Usuario.find().where('tipo').equals('usuario').select('-__v -confirmado -token -password -tokenStream ');
    if(!usuarios){
        const error = new Error('No hay usuarios registrados');
        return res.status(404).json({msg: error.message});
    }
    try {
        await res.json(usuarios);
    } catch (error) {
        console.log(error);
        
    }
}

const eliminarUsuario = async(req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    try {
        await usuario.delete();
        res.json({msg: 'Usuario eliminado correctamente'});
    } catch (error) {
        console.log(error);
    }
}

export {
    registrarUsuario,
    autenticar,
    confirmarCuenta,
    olvidePassword,
    comprobarToken,
    cambiarPassword,
    perfil,
    obtenerTodosUsuarios,
    obtenerSoloUsuarios,
    eliminarUsuario
}