const router = require('express').Router();
const sequelize = require('../conexion');
const validarAdministrador = require('../middlewares/validarAdministrador');

router.route('/')
    .get(validarAdministrador, async (req, res) => {
        const obtenerProductos = await sequelize.query ('SELECT * FROM productos', 
        {type: sequelize.QueryTypes.SELECT});
        res.json(obtenerProductos);
    })
    .post(validarAdministrador, async (req, res) => {
        const {nombre, url_foto, precio} = req.body;
        const crearProductos = await sequelize.query('INSERT INTO productos(nombre, url_foto, precio) VALUES (?,?,?)' , 
        { replacements: [nombre, url_foto, precio]}
        );
        res.json(crearProductos);
    })
    
    router.route('/:id')
    .get(validarAdministrador, (req, res) => {
        const idProduc = req.params.id;
        res.json('El pedido ' + idProduc);
    })
    .delete(validarAdministrador, async (req, res) => {
        const idProduct = req.params.id;
        const borrarProducto = await sequelize.query('DELETE FROM usuarios WHERE id = ?', {replacements: [id]});
        
        res.json(`El producto con el siguiente ${idProduct} fue eliminado`);
    });

    //El PUT se va actualizar directamente desde la UI entre las opciones de la BD
    
module.exports = router;