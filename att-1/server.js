const net = require('net');

const clientSockets = new Map();
const sockets = [];

const handleConnection = (socket) => {
    var firstMessage = true;

    socket.id = Math.floor(Math.random() * 1000);
    sockets.push(socket);
    socket.write("hello! what's your name: ");

    socket.on('data', (data) => {
        if (firstMessage) {
            firstMessage = false;
            clientSockets.set(socket.id, data.toString());
        } else {
            sockets.forEach((clientSocket) => {
                if (socket.id !== clientSocket.id){
                    const serverMessage = `${clientSockets.get(socket.id)}: ${data.toString()}`;
                    clientSocket.write(serverMessage);
                }
            });
        }

    });

    socket.on('end', () => {
        console.log('client disconnected...');
    })
}

const server = net.createServer(handleConnection);
server.listen(8080, '127.0.0.1');