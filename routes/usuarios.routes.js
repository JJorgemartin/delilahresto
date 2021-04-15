const router = require('express').Router();

router.route('/')
    .get((req, res) => {
        res.json('Hola desde get de usuario')
    })
    .post((req, res) => {
        res.json('Hola desde post de usuario')
    })
    .put((req, res) => {
        res.json('Hola desde put de usuario')
    })
    .delete((req, res) => {
        res.json('Hola desde delete de usuario')
    });

module.exports = router;