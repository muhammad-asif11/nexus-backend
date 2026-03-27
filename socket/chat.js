// socket/chat.js
module.exports = (socket, io) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send-message", ({ roomId, message }) => {
    io.to(roomId).emit("receive-message", message);
  });
  
  socket.on("send-message", ({ to, message, from }) => {
  const targetSocket = users[to];

  if (targetSocket) {
    io.to(targetSocket).emit("receive-message", {
      message,
      from,
    });
  }
});
};