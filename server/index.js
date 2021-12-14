const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { EventTypes } = require("./types");

const app = express();

app.use(cors());
app.use(express.static("../client/dist"));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on(EventTypes.SEQUENCER_CELL_CLICK, (data) => {
    socket.broadcast.emit(EventTypes.SEQUENCER_CELL_CLICK, data);
  });
});

httpServer.listen(8000);
