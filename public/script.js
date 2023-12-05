var socket = io();
let btn = document.getElementById('btn');


btn.onclick = () => {
    console.log('clicked');
    socket.emit('from_client');
}

socket.on('from_server',() => {
    console.log('from server');
    const div =  document.createElement('div');
    div.innerHTML = 'from server';
    document.body.appendChild(div);
    console.log(div)
    }) 