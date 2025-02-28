import { WebSocketServer, WebSocket } from "ws";

const wss: WebSocketServer = new WebSocketServer({ port: 8080 });

type User = {
    id: number,
    name: string,
    socket: WebSocket
}

let userList: User[] = [];

wss.on("connection", (socket: WebSocket) => {

    // On new connection - add the user
    const newUser: User = {
        id: userList.length,
        name: "User#" + userList.length,
        socket
    };
    userList.push(newUser);

    console.log("user connected #" + newUser.id);

    // Broadcast messages to other users
    socket.on("message", (message) => {

        userList.forEach((user: User) => {
            if (user.id !== newUser.id) {
                user.socket.send(user.name + ": " + message.toString())
            };
        });

    });

    // Remove user on disconnect
    socket.on("disconnect", () => {
        userList = userList.filter(u => u.socket !== socket);
    });
});