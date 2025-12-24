import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const application = express();
const httpServer = createServer(application);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

application.get('/health', (request, response) => response.send("OK!"))

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    })
})

const PORT = 3000;

httpServer.listen(PORT, () => {
    console.log(`Monolith Server Running on http://localhost:${PORT}`);
})