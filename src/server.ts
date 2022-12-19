import { IncomingHttpHeaders } from "http";
import { ParsedUrlQuery } from "querystring";
import { Server, Socket } from "socket.io";
import { Handshake } from "socket.io/dist/socket";

const port = parseInt(process.env.PORT || '3300');
const app = require('express')();
const server = require('http').createServer(app);
const io = new Server(server);

io.on('connection', (socket: Socket) => {
  const transport = socket.conn.transport;
  const id = socket.id;
  const handshake: Handshake = socket.handshake;
  // const headers: IncomingHttpHeaders = handshake.headers;
  const query: ParsedUrlQuery = handshake.query;
  const auth = handshake.auth;
  const myKey = query['my-key'];

  console.log(`New connect: ${id} | auth: ${auth.token} | custom key: ${myKey} | transport: ${transport.protocol}`);

  socket.on('ping', (data: any, callback: Function) => {
    console.log(`ping: ${id}`);

    callback({
      id,
      date: new Date(),
      ...data,
    });
  });
});

console.log(`Sokcet listen port: ${port}`);
io.listen(port);