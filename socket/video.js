// socket/video.js
let users = {};

module.exports = (socket, io) => {
  // store user socket
  socket.on("register-user", (userId) => {
    users[userId] = socket.id;
  });

  // call user
  socket.on("call-user", ({ to, signal, from }) => {
    const targetSocket = users[to];

    if (targetSocket) {
      io.to(targetSocket).emit("incoming-call", {
        signal,
        from,
      });
    }
  });

  // answer call
  socket.on("answer-call", ({ to, signal }) => {
    const targetSocket = users[to];

    if (targetSocket) {
      io.to(targetSocket).emit("call-accepted", signal);
    }
  });

  // end call
  socket.on("end-call", ({ to }) => {
    const targetSocket = users[to];

    if (targetSocket) {
      io.to(targetSocket).emit("call-ended");
    }
  });
};