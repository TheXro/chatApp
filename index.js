const req = require("express/lib/request");
const http = require("http")
const socketio = require('socket.io')
const connect = require('./config/database-config')
const express = require("express");
const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('a user connected', socket.id)

    // socket.on('from_client',() => {
    //     console.log('from_client');
    //     })

    socket.on('join_room', (data) => {
        socket.join(data.roomid, (data) => {
            console.log('joinned', data);
        });
    })

    // setInterval(() => {
    //     socket.emit('from_server')},2000)
    socket.on('msg_send', (data) => {
        console.log('msg received at server', data);
        // socket.emit('msg_rcvd', data) // send to only sender
        //     // socket.broadcast.emit('msg_rcvd', data) // send to all except sender
        io.to(data.roomid).emit('msg_rcvd', data)
    })
    //rooms
    //using roots people can connect to separate socktes that you specify
    //when people sent msg in room then only person in room will get msg
    //


    //creating room


})

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// }); will give error if try to get socket js  

app.get('/chat/:roomId', (req, res) => {
    res.render('index', {
        id: req.params.roomId
        //     name: 'thexro'
    });
})


server.listen(3000, async () => {
    console.log("Server is running on port 3000");
    await connect();
    console.log("mongodb connected")
})  