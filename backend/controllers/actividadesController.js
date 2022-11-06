
import Actividades from '../models/actividades.js';
import Usuario from '../models/usuario.js';

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
        const actividad = new Actividades.create(req.body); 
        res.json(actividad);
    } catch (error) {
        console.log(error);
    }
    
}

const editarActividad = async (req, res)=>{
    const {_id} = req.body;
    const actividadEncontrada = await Actividades.findById(_id);
    if(!actividadEncontrada){
        const error = new Error('La actividad no existe');
        return res.status(404).json({msg: error.message});
    }
    try {
        const {titulo, descripcion, duracion, imagen, categoria} = req.body;
        actividadEncontrada.titulo = titulo || actividadEncontrada.titulo;
        actividadEncontrada.descripcion = descripcion || actividadEncontrada.descripcion;
        actividadEncontrada.duracion = duracion || actividadEncontrada.duracion;
        actividadEncontrada.imagen = imagen || actividadEncontrada.imagen;
        actividadEncontrada.categoria = categoria || actividadEncontrada.categoria;
        await actividadEncontrada.save();
        res.json({msg: 'Actividad editada correctamente'});
    } catch (error) {
        console.log(error);
    }
}

const eliminarActividad = async (req, res)=>{
    const {identificador} = req.body;
    const {actividadEncontrada} = await Actividades.findById(identificador);
    if(!actividadEncontrada){
        const error = new Error('La actividad no existe');
        return res.status(404).json({msg: error.message});
    }
    try {
        await actividadEncontrada.delete();
        return res.json({msg: 'Actividad eliminada correctamente'});
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
    console.log(actividad);
    if(!usuarioEncontrado){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    if(!actividad){
        const error = new Error('La actividad no existe');
        return res.status(404).json({msg: error.message});
    }
    try {
        // console.log(actividad);
        // actividad.completadaPor = [...actividad.completadaPor, idUsuario];
    
        // await actividad.save();
        // return res.json({msg: "Actividad completada correctamente"});
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
    completarActividad
}