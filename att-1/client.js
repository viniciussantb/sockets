const net = require('net');
const readLine = require('readline');
const IreadLine = readLine.Interface({
    input: process.stdin,
    output: process.stdout
});

const socket = new net.Socket();

socket.connect(8080, '127.0.0.1', () => {
    console.log('connected to the server...');

    IreadLine.addListener('line', (line) => {
        socket.write(line);
    })
});

socket.on('data', (data) => {
    console.log(data.toString());
  });
  
socket.on('close', () => {
console.log('Connection closed');
});