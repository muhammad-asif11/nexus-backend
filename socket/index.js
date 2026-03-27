// socket/index.js
const chatHandler = require("./chat");
const videoHandler = require("./video");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Chat events
    chatHandler(socket, io);

    // Video call events
    videoHandler(socket, io);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};