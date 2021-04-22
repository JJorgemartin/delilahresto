const router = require('express').Router();

router.route('/')
    .get((req, res) => {
        res.json('Hola desde get de productos')
    })
    .post((req, res) => {
        res.json('Hola desde post de productos')
    })
    .put((req, res) => {
        res.json('Hola desde put de productos')
    })
    .delete((req, res) => {
        res.json('Hola desde delete de productos')
    });

router.route('/:id')
    .get((req, res) => {
        const idPedido = req.params.id;
        res.json('El pedido ' + idPedido);
    })
    .put((req,res) => {
        const idPedido = req.params.id;
        const { estadoNuevo } = req.body;
        res.json('El pedido ' + idPedido + ' se cambio al estado ' + estadoNuevo);
    })

module.exports = router;