const router = require('express').Router();

router.route('/')
    .get((req, res) => {
        res.json('Hola desde get de pedidos')
    })
    .post((req, res) => {
        res.json('Hola desde post de pedidos')
    })
    .put((req, res) => {
        res.json('Hola desde put de pedidos')
    })
    .delete((req, res) => {
        res.json('Hola desde delete de pedidos')
    });

module.exports = router;