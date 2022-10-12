import nodemailer from 'nodemailer';
export const emailRegistro = async (datos)=>{
    const {email, token, nombre} = datos;
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5a8428a4bfad1a",
          pass: "6efe3437d4c189"
        }
    });
    const info = await transport.sendMail({
        from: 'Aureos <dev@team.com>',
        to: email,
        subject: 'Confirmar Cuenta',
        html:`
            <p>Confirma tu cuenta dando click en el siguiente enlace: </p>
            <a href='http://127.0.0.1:5173/confirmar/${token}'>Verificar Cuenta</a>
        `
    });
}

export const cambiarContrasenia = async (datos)=>{
    const {email, token, nombre} = datos;
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5a8428a4bfad1a",
          pass: "6efe3437d4c189"
        }
    });
    const info = await transport.sendMail({
        to: email,
        from: 'Aureos <dev@team.com>',
        subject: 'Reiniciar password',
        html: `
            <h1>Hola: ${nombre}</h1>
            <p>Cambia tu contraseña accediendo a la siguiente página: </p>
            <a href='http://127.0.0.1:5173/olvide-password/${token}'>Cambiar Password</a>
        `
    })
}