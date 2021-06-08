const sequelize = require("../conexion");
const Usuario = require("../models/Usuario");


const validarVacios = async (req, res, next) => {

    
    if (! req.body.nombre_usuario || !req.body.nombre_apellido || !req.body.email|| !req.body.direccion_envio || !req.body.telefono  || !req.body.contrasena ) {
        return res.status(400).json({ message :"Ningun campo puede estar vacio"});
    }else{
        next();
    }
};

//Corregir esta funcion!
const validarEmail = async (req, res, next) => {
    const email = await sequelize.query ('SELECT * FROM usuario', 
    {type: sequelize.QueryTypes.SELECT});

    // console.log(email);

    const verifyEmail = email.find(x => x.email == req.body.email);

    if (verifyEmail){ 
        return res.status(400).json({ message: "El mail ya esta registrado"})
    }
    next();
};

module.exports = {validarEmail, validarVacios};