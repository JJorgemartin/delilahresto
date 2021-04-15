const express = require('express');

//Iniciar app con express
const app = express();

//Middlewares
app.use(express.json());

// Routes
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/pedidos', require('./routes/pedidos.routes'));


app.listen(3000, () => { console.log('Servidor escuchando en el puerto 3000');});