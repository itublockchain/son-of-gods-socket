import dotenv from "dotenv";
dotenv.config();
import { v4 as uuidv4 } from "uuid";

import events from "./events/index.js";
import { IO } from "./server.js";

let empty_rooms = [];

IO.on("connection", async (socket) => {

    const { address, ...rest } = socket.handshake.query;
    console.log(address);
    let room_name;

    if (empty_rooms.length === 1) {
        const empty_room = empty_rooms[0];
        socket.join(empty_room);
        room_name = empty_room;
        empty_rooms.pop();
        console.log("Doldu")
    }
    else {
        const unique_id = uuidv4();
        socket.join(unique_id);
        room_name = unique_id;
        empty_rooms.push(unique_id);
        console.log("yeni açıldı")
    }

    socket.data.room_name = room_name;
    socket.data.address = address;
    socket.data = {
        ...rest,
        address,
        room_name
    };

    const usersInRoom = await IO.in(room_name).fetchSockets();

    const other_users = usersInRoom.filter(item => {
        return item.data.address !== address;
    });


    if (other_users.length > 0) {
        socket.emit("otherUser", other_users[0].data)
    }

    events(socket);
});
