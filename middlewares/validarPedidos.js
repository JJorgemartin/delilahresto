const Pedido = require('../models/Pedidos');


const validarVaciosPed = async (req, res, next) => {
    if (! req.body.id_usuario || !req.body.forma_pago || !req.body.total|| !req.body.productos) {
        return res.status(400).json({ message :"Ningun campo puede estar vacio"});
    }else{
        next();
    }
};

module.exports = validarVaciosPed;