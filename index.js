const req = require("express/lib/request");
const http = require("http")
const socketio = require('socket.io')

const express = require("express");
const app = express();
const server = http.createServer(app)
const io = socketio(server)
app.use('/', express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('a user connected', socket.id)

    // socket.on('from_client',() => {
    //     console.log('from_client');
    //     })

    // setInterval(() => {
    //     socket.emit('from_server')},2000)
    socket.on('msg_send', (data) => {
        console.log('msg received at server', data.msg);
        // socket.emit('msg_rcvd', data) // send to only sender
        // socket.broadcast.emit('msg_rcvd', data) // send to all except sender
        io.emit('msg_rcvd', data)
    })
})

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// }); will give error if try to get socket js  

server.listen(3000, () => {
    console.log("Server is running on port 3000");
})