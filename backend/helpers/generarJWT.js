import jwt from 'jsonwebtoken';

const generarJWT = (id)=>{
    return jwt.sign({id}, 'SECRET', {
        expiresIn: '3d'
    })
}

export default generarJWT;