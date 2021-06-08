const sequelize = require('./../conexion');

const Pedido = {};

Pedido.crear = async (forma_pago, estado_pedido, total, usuario_id) => {
    try{
        const result = await sequelize.query('INSERT INTO pedidos (forma_pago, estado_pedido, total, usuario_id) VALUES (?,?,?,?)', 
        { replacements: [forma_pago, estado_pedido, total, usuario_id]
    }); 
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

Pedido.relacionarProducto = async (pedido_id, producto_id, precio, cantidad) => {
    try{
        const result = await sequelize.query('INSERT INTO pedido_productos (pedido_id, producto_id, precio, cantidad) VALUES (?,?,?,?)', 
        { replacements: [pedido_id, producto_id, precio, cantidad]
    }); 
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
}

Pedido.obtenerTodos = async () => {
    const result = await sequelize.query('SELECT pedidos.estado_pedido, pedidos.id, pedidos.total, pedidos.forma_pago, usuario.nombre_apellido, usuario.direccion_envio FROM pedidos JOIN usuario ON usuario.id = pedidos.usuario_id', 
        { type: sequelize.QueryTypes.SELECT });
    console.log(result);
    return result;
};

Pedido.obtenerPorId = async (id) => {
    const result = await sequelize.query('SELECT pedidos.estado_pedido, pedidos.id, pedidos.total, pedidos.forma_pago, usuario.nombre_apellido, usuario.direccion_envio FROM pedidos JOIN usuario ON usuario.id = pedidos.usuario_id WHERE pedidos.id = ?', 
        {   replacements: [id],
            type: sequelize.QueryTypes.SELECT });
    console.log(result);
    return result;
};

Pedido.borrarPorId = async (id) => {
    const result = await sequelize.query('SELECT pedidos.estado_pedido, pedidos.id, pedidos.total, pedidos.forma_pago, usuario.nombre_apellido, usuario.direccion_envio FROM pedidos JOIN usuario ON usuario.id = pedidos.usuario_id WHERE pedidos.id = ?', 
        {   replacements: [id],
            type: sequelize.QueryTypes.SELECT });
    console.log(result);
    return result;
};

Pedido.obtenerDetalle = async (id_pedido) => {
    const result = await sequelize.query('SELECT productos.nombre, productos.url_foto, productos.precio, pedido_productos.cantidad FROM pedido_productos JOIN productos ON productos.id = pedido_productos.producto_id WHERE pedido_productos.pedido_id = ?', 
    { 
        replacements:[id_pedido],
        type: sequelize.QueryTypes.SELECT 
    });
    console.log(result);
    return result;
};

Pedido.actualizarEstado = async (id_pedido, estado_pedido) => {
    try{
        const result = await sequelize.query('UPDATE pedidos SET estado_pedido = ? WHERE id = ?', {
        replacements: [estado_pedido, id_pedido]
    }); 
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}



module.exports = Pedido;