import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';

const checkAuth = async(req, res, next)=>{
    let token = '';
    if(req.headers.authorization && req.headers.authorization.startsWith(`Bearer `)){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'SECRET');
            const {id} = decoded;
            req.usuario = await Usuario.findById(id).select('-password -confirmado -__v -token -createdAt -updatedAt');
            return next();
        } catch (error) {
            return res.status(404).json({msg: 'Hubo un error'});
        }
    }else{
        return res.status(403).json({msg: 'Token no válido'});
    }
}
export default checkAuth;