import http from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();


app.use(
  express.urlencoded({
    extended: true
  })
);

if (process.env.NODE_ENV === "development") {
    app.use(cors());
}

app.use(express.json());

const server = http.createServer(app);
const IO = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true
    },
    path: "/socket.io",
    maxHttpBufferSize: 5e6
});


server.listen(80, () => {
    console.log("Server listening at port 80");
});

export {
    app, IO
};
