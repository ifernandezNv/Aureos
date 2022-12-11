import * as dotenv from 'dotenv';
import Actividades from '../models/actividades.js';
import Usuario from '../models/usuario.js';

dotenv.config();

const crearActividad = async (req, res)=>{
    const {identificador, creadaPor} = req.body;
    const actividadEncontrada = await Actividades.findOne({identificador});
    const usuarioEncontrado = await Usuario.findById(creadaPor).select('-__v -updatedAt -createdAt -password -confirmado -token');
    if(actividadEncontrada){
        const error = new Error('La actividad ya existe');
        return res.status(403).json({msg: error.message});
    }
    if(!usuarioEncontrado){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    if(usuarioEncontrado.tipo === 'usuario'){
        const error = new Error('Acción no válida');
        return res.status(401).json({msg: error.message});
    }
    try {
        const actividad = new Actividades(req.body);
        await actividad.save();
        res.json(actividad);
    } catch (error) {
        console.log(error.response);
    }
    
}

const editarActividad = async (req, res)=>{
    const {id} = req.params;
    const actividadEncontrada = await Actividades.findById(id);
    if(!actividadEncontrada){
        const error = new Error('La actividad no existe');
        return res.status(404).json({msg: error.message});
    }
    try {
        const {titulo, descripcion, duracion, imagen, categoria, instrucciones, contenido} = req.body;
        actividadEncontrada.titulo = titulo || actividadEncontrada.titulo;
        actividadEncontrada.descripcion = descripcion || actividadEncontrada.descripcion;
        actividadEncontrada.duracion = duracion || actividadEncontrada.duracion;
        actividadEncontrada.imagen = imagen || actividadEncontrada.imagen;
        actividadEncontrada.instrucciones = instrucciones || actividadEncontrada.instrucciones;
        actividadEncontrada.contenido = contenido || actividadEncontrada.contenido;
        if(actividadEncontrada.categoria.includes(categoria)){
            actividadEncontrada.categoria = actividadEncontrada.categoria;
        }else{
            actividadEncontrada.categoria = categoria;
        }
        actividadEncontrada.creadaPor = actividadEncontrada.creadaPor;
        actividadEncontrada.completadaPor = actividadEncontrada.completadaPor;
        await actividadEncontrada.save();
        res.json({msg: 'Actividad editada correctamente'});
    } catch (error) {
        console.log(error);
    }
}

const eliminarActividad = async (req, res)=>{
    const {id} = req.body;
    const actividadEncontrada = await Actividades.findById(id);
    if(!actividadEncontrada){
        const error = new Error('La actividad no existe');
        return res.status(404).json({msg: error.message});
    }
    try {
        await actividadEncontrada.delete();
        res.json({msg: 'Actividad eliminada correctamente'});
    } catch (error) {
        console.log(error);
    }
}

const obtenerActividadesCategoria = async (req, res)=>{
    const {categoria} = req.body;
    const actividadesEncontradas = await Actividades.find({"categoria" : categoria});
    if(!actividadesEncontradas){
        const error = new Error('No hay actividades de esta categoría');
        return res.status(404).json({msg: error.message});
    }
    try {
        res.json(actividadesEncontradas);
    } catch (error) {
        console.log(error);
    }
}

const obtenerActividadesGeneral = async (req, res)=>{
    const actividadesEncontradas = await Actividades.find();
    if(!actividadesEncontradas){
        const error = new Error('No hay actividades de esta categoría');
        return res.status(404).json({msg: error.message});
    }
    try {
        res.json(actividadesEncontradas);
    } catch (error) {
        console.log(error);
    }
}

const obtenerActividadesCreadas = async (req, res) =>{
    const {idUsuario} = req.body;
    const usuarioEncontrado = await Usuario.findById(idUsuario);
    if(!usuarioEncontrado){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    try {
        const actividades = await Actividades.find().where('creadaPor').equals(idUsuario);
        const actividadesCreadas = await Actividades.find().where('creadaPor').equals(idUsuario);
        return res.json(actividadesCreadas);
    } catch (error) {
        console.log(error);
    }
}

const obtenerActividad = async (req, res) => {
    const {id} = req.params;
    const actividad = await Actividades.findById(id);
    if(!actividad){
        const error = new Error('La actividad no existe');
        return res.status(404).json({msg: error.message});
    }
    try {
        return res.json(actividad);
    } catch (error) {
        console.log(error);
    }
}
const completarActividad = async (req, res) => {
    const {idUsuario} = req.body;
    const {id} = req.params;
    const usuarioEncontrado = await Usuario.findById(idUsuario);
    const actividad = await Actividades.findById(id);
    if(!usuarioEncontrado){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    if(!actividad){
        const error = new Error('La actividad no existe');
        return res.status(404).json({msg: error.message});
    }
    try {
        
        actividad.completadaPor.push(idUsuario);
        await actividad.save();
        return res.json({msg: "Actividad completada correctamente"});
    } catch (error) {
        console.log(error);
    }
}

const verActividadesCompletadas = async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    const actividadesCompletadas = await Actividades.find().where('completadaPor').equals(id);
    if(!actividadesCompletadas){
        const error = new Error('No se ha completado ninguna actividad');
        return res.json({msg: error.message});
    }
    try {
        await res.json(actividadesCompletadas);
        return;
    } catch (error) {
        console.log(error);
    }
}

export {
    crearActividad,
    editarActividad,
    eliminarActividad,
    obtenerActividadesCategoria,
    obtenerActividadesGeneral,
    obtenerActividadesCreadas,
    obtenerActividad,
    completarActividad,
    verActividadesCompletadas
}