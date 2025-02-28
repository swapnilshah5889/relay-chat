import { WebSocketServer } from "ws";

const wss: WebSocketServer = new WebSocketServer({ port: 8080 });

let userCount: number = 0;

wss.on("connection", (socket: WebSocket) => {
    userCount += 1;
    console.log("user connected #" + userCount);
});