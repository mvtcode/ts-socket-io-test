import { io } from "socket.io-client";

const socket = io("ws://localhost:3300", {
  reconnectionDelayMax: 10000,

  transports: ["websocket"],

  auth: {
    token: "123"
  },
  query: {
    "my-key": "my-value"
  }
});

const ping = () => {
  socket.emit('ping', {ready: true}, (data: any) => {
    console.log(data);
  });
}

socket.on("connect", () => {
  console.log(`Socket connected`);

  setInterval(() => {
    ping();
  }, 5000);
  ping();
});

socket.on("ping", () => {
  socket.emit('pong');
});