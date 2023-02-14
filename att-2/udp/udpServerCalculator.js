const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

socket.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    const args = msg.toString().split(' ');

    let serverMsg;
    if (args.length !== 3) {
        serverMsg = 'invalid input! please try again...';
    } else {
        if (args[2] === '+') {
            serverMsg = (+args[0]) + (+args[1]);
        } else if(args[2] === '*') {
            serverMsg = (+args[0]) * (+args[1]);
        } else if(args[2] === '-') {
            serverMsg = (+args[0]) - (+args[1]);
        }
        else if(args[2] === '/') {
            serverMsg = (+args[0]) / (+args[1]);
        } else {
            serverMsg = 'invalid input! please try again...';
        }
    }

    socket.send(serverMsg.toString(), rinfo.port, rinfo.address);
    console.log('message: ', serverMsg);
})

socket.bind(8081);
