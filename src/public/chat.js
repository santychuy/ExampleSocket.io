const socket = io();

//DOM Elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');


btn.addEventListener('click', () => {
    socket.emit('mensajeMandado', {
        username: username.value,
        message: message.value
    });
});

message.addEventListener('keypress', () => {
    socket.emit('mensajeEscribiendo', username.value);
});

socket.on('mensajeServidor', (data) => {
    actions.innerHTML = '';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`;
});

socket.on('mensajeServidor', () => {
    actions.innerHTML = `<p><em>${data} está escribiendo...</em></p>`;
});