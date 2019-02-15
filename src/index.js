const express = require('express');
const morgan = require('morgan');
const path = require('path');
const socketIO = require('socket.io');


//Inits
const app = express();


//Setting
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));


//Routes


//Static Files
//Ojo: Siempre se buscara el primer archivo que tenga de nombre INDEX
app.use(express.static(path.join(__dirname, 'public')));


//Run Server
const server = app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});

//Websockets
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New connection');

    socket.on('mensajeMandado', (data) => {
        io.sockets.emit('mensajeServidor', data);
    });

    socket.on('mensajeServidor', (data) => {
        socket.broadcast.emit('mensajeServidor', data);
    });
});
