

const move = (socket, msg) => {
    

    socket.broadcast.emit("move", msg);
};
