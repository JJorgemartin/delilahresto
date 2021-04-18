const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const conexion = require('./conexion');
const bcrypt = require('bcryptjs');
const sequelize = require('./conexion');

//Iniciar app con express
const app = express();

//Middlewares
app.use(express.json());
app.use(expressJwt({
    secret: process.env.jwt_pass,
    algorithms: ['HS256']
}).unless({
    path: ['/login', '/registrar']
}));

app.post('/login', async (req, res) => {
    const {nombre_usuario, contrasena } = req.body;
    const result = await conexion.query('SELECT * FROM usuario WHERE nombre_usuario = ? OR email = ?', {
        type: sequelize.QueryTypes.SELECT, 
        replacements: [nombre_usuario, nombre_usuario]
    });
   
    if(result.length > 0 && bcrypt.compareSync(contrasena, result[0].contrasena) ) {
        const {nombre_apellido, direccion_envio, email, esAdministrador} = result[0]
        const token = jwt.sign({usuario: nombre_apellido, direccion_envio, email, esAdministrador}, process.env.jwt_pass);
        res.json(token);
    } else {
        res.status(401).json('Usuario y/o contraseña incorrectas');
    }

});

app.post('/registrar', async (req, res) => {
    const { nombre_usuario, nombre_apellido, email, direccion_envio, telefono, contrasena } = req.body;

    const hash = bcrypt.hashSync(contrasena, 10);

    await conexion.query('INSERT INTO usuario (nombre_usuario, nombre_apellido, email, direccion_envio, telefono, contrasena, esAdministrador) VALUES (?,?,?,?,?,?,FALSE)', {
        replacements: [nombre_usuario, nombre_apellido, email, direccion_envio, telefono, hash]
    });
    res.status(204).end();
});

// Routes
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/pedidos', require('./routes/pedidos.routes'));


app.listen(process.env.PORT, () => { console.log('Servidor escuchando en el puerto ' + process.env.PORT);});