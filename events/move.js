

const move = (socket, msg) => {
    const newMsg = {
        table: msg.table.reverse(),
    };
    socket.broadcast.emit("move", newMsg);
};

export default move;
