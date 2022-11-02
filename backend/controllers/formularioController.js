import express from 'express';
import Formulario from '../models/formulario.js';

import Usuario from '../models/usuario.js';

const registrarRespuestas = async(req, res) =>{
    const {respuestas, idUsuario} = req.body;
    const usuarioExistente = await Usuario.findById(idUsuario).select('-__v -createdAt -updatedAt -password -token -email -confirmado -tipo');
    const formulario = new Formulario(req.body);
    if(!usuarioExistente){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.messsage});
    }
    try {
        const formularioAlmacenado = await formulario.save();
        return res.json(formularioAlmacenado);
    } catch (error) {
        console.log(error);
    }
}

const verificarEnvioFormulario  = async(req, res)=>{
    const {idUsuario} = req.body;
    const usuarioRespondio = await Formulario.findOne({idUsuario});
    const usuarioExistente = await Usuario.findById(idUsuario);
    if(!usuarioExistente){
        const error = new Error('El usuario no existe');
        res.status(404).json({msg: error.message});
        return;
    }
    try {
        if(usuarioRespondio){
            res.json({enviado: true});
            return;
        }
        res.json({enviado: false});
        return;   
    } catch (error) {
        console.log(error);
    }
}

const buscarPatologiaUsuario  = async(req, res)=>{
    const {idUsuario} = req.body;
    const usuarioRespondio = await Formulario.findOne({idUsuario}).select('-__v -tipo -respuestas');
    const usuarioExistente = await Usuario.findById(idUsuario);
    if(!usuarioExistente){
        const error = new Error('El usuario no existe');
        res.status(404).json({msg: error.message});
        return;
    }
    try {
        if(usuarioRespondio){
            return res.json(usuarioRespondio);
        }
        return;   
    } catch (error) {
        console.log(error);
    }
}

export {
    registrarRespuestas,
    verificarEnvioFormulario,
    buscarPatologiaUsuario
}