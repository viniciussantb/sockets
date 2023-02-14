const dgram = require('node:dgram');
const { Buffer } = require('node:buffer');
const readLine = require('readline');
const IreadLine = readLine.Interface({
    input: process.stdin,
    output: process.stdout
});

const client = dgram.createSocket('udp4');
client.connect(8081, 'localhost', (err) => {
    IreadLine.addListener('line', (line) => {
        const message = Buffer.from(line);
        if (line === 'close') {
            client.close();
            IreadLine.close();
        } else {
            client.send(message);
        }
    });
});

client.on('message', (msg, rinfo) => {
    console.log(`server sent: ${msg.toString()}`);
});