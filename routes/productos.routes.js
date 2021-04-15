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

module.exports = router;