const router = require('express').Router();
const conexion = require('../conexion');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('./../conexion');
const Usuario = require('../models/Usuario');
const validarUsuario = require('../middlewares/validarUsuario');


router.route('/login').post(async (req, res) => {
    const {nombre_usuario, contrasena } = req.body;
    const result = await conexion.query('SELECT * FROM usuario WHERE nombre_usuario = ? OR email = ?', {
        type: sequelize.QueryTypes.SELECT, 
        replacements: [nombre_usuario, nombre_usuario]
    });
   
    if(result.length > 0 && bcrypt.compareSync(contrasena, result[0].contrasena)) {
        const {nombre_apellido, direccion_envio, email, esAdministrador} = result[0]
        const token = jwt.sign({usuario: nombre_apellido, direccion_envio, email, esAdministrador}, process.env.jwt_pass);
        res.json(token);
    } else {
        res.status(401).json('Usuario y/o contraseña incorrectas');
    }

    })

router.route('/registrar').post(validarUsuario.validarEmail, validarUsuario.validarVacios, async (req, res) => {
    const { nombre_usuario, nombre_apellido, email, direccion_envio, telefono, contrasena } = req.body;

    const result = await Usuario.crear(nombre_usuario, nombre_apellido, email, direccion_envio, telefono, hash);
    res.status(204).end();
    });
    

module.exports = router;