const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

const clientSocketsId = []
const clientsNames = new Map();

socket.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    const clientAddress = `${rinfo.address}:${rinfo.port}`;
    let serverMsg;
    if (!clientSocketsId.includes(clientAddress)) {
        clientSocketsId.push(clientAddress);
        clientsNames.set(clientAddress, msg.toString());
        serverMsg = `${msg} joined the chat room!`;
    } else {
        serverMsg = `${clientsNames.get(clientAddress)}: ${msg.toString()}`;
    }

    if (clientSocketsId.length > 1) {
        clientSocketsId.forEach(id => {
            const [ip, port] = id.split(':');
            console.log('ip: ', ip);
            console.log('port: ', port);
            console.log('rinfo: ', rinfo)
            if (ip !== rinfo.address | +port !== rinfo.port) {
                socket.send(serverMsg.toString(), port, ip);
            }
        });
    }
})

socket.bind(8081);
