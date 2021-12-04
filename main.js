import dotenv from "dotenv";
dotenv.config();


import events from "./events/index.js";
import { IO } from "./server.js";

IO.on("connection", async (socket) => {
    events(socket);
});
