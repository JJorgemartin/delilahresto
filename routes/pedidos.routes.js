const router = require('express').Router();
const validarAdministrador = require('../middlewares/validarAdministrador');
const Pedido = require('../models/Pedidos');
const validarVaciosPed = require('../middlewares/validarPedidos');

router.route('/')
    .get(validarAdministrador, async (req, res) => {
        let pedidos = await Pedido.obtenerTodos();

        pedidos = await Promise.all(
            pedidos.map(async pedido => {
                const detalles = await Pedido.obtenerDetalle(pedido.id)
                pedido.detalles = detalles;
                return pedido;
            })
        );

        res.json(pedidos);
    })
    .post( validarAdministrador, validarVaciosPed , async (req, res) => {
        const { id_usuario, forma_pago, total, productos} = req.body;
        const result = await Pedido.crear(forma_pago, 'Nuevo', total, id_usuario);

        productos.forEach(producto => {
            Pedido.relacionarProducto(result[0], producto.id, producto.precio, producto.cantidad)
        })

        console.log(result[0]);
        res.json('ok')
    })

    
    router.route('/:id')
    .get( async (req, res) => {
        const idPedido = req.params.id;
        
        let pedidos = await Pedido.obtenerPorId(idPedido);
        pedidos = await Promise.all(
            pedidos.map(async pedido => {
                const detalles = await Pedido.obtenerDetalle(pedidos.id)
                pedido.detalles = detalles;
                return pedido;
            })
            );
            
            res.json(pedidos);
        })
    .put((req, res) => {
        const idPedido = req.params.id;
        const { estadoNuevo } = req.body;
        Pedido.actualizarEstado(idPedido, estadoNuevo);
            
        res.json('El pedido ' + idPedido + ' se cambio al estado ' + estadoNuevo);
    })
        
    .delete((req, res) => {
        const idPedido = req.params.id;
        Pedido.borrarPorId(idPedido);
        res.json('El pedido' + idPedido + 'fue eliminado correctamente');
    });
module.exports = router;