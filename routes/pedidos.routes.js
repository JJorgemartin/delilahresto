const router = require('express').Router();
const validarAdministrador = require('../middlewares/validarAdministrador');
const Pedido = require('../models/Pedidos');

router.route('/')
    // .get( validarAdministrador, async (req, res) => {
    //     const pedidos = await Pedido.obtenerTodos();
    //     // pedidos.forEach( async (pedido) => {
    //     //     const detalles = await Pedido.obtenerDetalle(pedido.id);
    //     //     detalles.forEach(detalle => {
    //     //         pedido.descripcion += `${detalle.cantidad}x ${detalle.nombre}`
    //     //     });
    //     })
    //     res.json(pedidos)
    // })
    .post( validarAdministrador , async (req, res) => {
        const { id_usuario, forma_pago, total, productos} = req.body;
        const result = await Pedido.crear(forma_pago, 'Nuevo', total, id_usuario);

        productos.forEach(producto => {
            Pedido.relacionarProducto(result[0], producto.id, producto.precio, producto.cantidad)
        })

        console.log(result[0]);
        res.json('ok')
    })
    .put((req, res) => {
        res.json('Hola desde put de pedidos')
    })
    .delete((req, res) => {
        res.json('Hola desde delete de pedidos')
    });

router.route('/:id')
    .get((req, res) => {
        const idPedido = req.params.id;
        res.json('El pedido' + idPedido)
    })
    .put((req, res) => {
        const idPedido = req.params.id;
        const { estadoNuevo } = req.body;

        res.json('El pedido ' + idPedido + ' se cambio al estado ');
    })

module.exports = router;