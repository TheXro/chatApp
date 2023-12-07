var socket = io();
let btn = document.getElementById('btn');


let msglist = document.getElementById('msglist');
let inputMsg = document.getElementById('newmsg');

// btn.onclick = () => {
//     console.log('clicked');
//     socket.emit('from_client');
// }

// socket.on('from_server',() => {
//     console.log('from server');
//     const div =  document.createElement('div');
//     div.innerHTML = 'from server';
//     document.body.appendChild(div);
//     console.log(div)
//     }) 

btn.onclick = () => {
    console.log('clicked');
    socket.emit('msg_send',{
        msg: inputMsg.value
    });
}

socket.on('msg_rcvd',(data) => {
    console.log('msg received at server', data.msg);
    let li = document.createElement('li');
    li.innerHTML = data.msg;
    msglist.appendChild(li);
});

