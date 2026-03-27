const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// ✅ Create HTTP server (IMPORTANT for socket)
const server = http.createServer(app);

// ✅ Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // later replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

// ================== ROUTES ==================
app.use("/uploads", express.static("public/uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

// ================== SOCKET LOGIC ==================

let users = {}; // store online users

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ✅ Register user
  socket.on("register-user", (userId) => {
    users[userId] = socket.id;
    console.log("Users:", users);
  });

  // ================= CHAT =================
  socket.on("send-message", ({ to, message, from }) => {
    const targetSocket = users[to];

    if (targetSocket) {
      io.to(targetSocket).emit("receive-message", {
        message,
        from,
      });
    }
  });

  // ================= VIDEO CALL =================

  // Call user
  socket.on("call-user", ({ to, signal, from }) => {
    const targetSocket = users[to];

    if (targetSocket) {
      io.to(targetSocket).emit("incoming-call", {
        signal,
        from,
      });
    }
  });

  // Answer call
  socket.on("answer-call", ({ to, signal }) => {
    const targetSocket = users[to];

    if (targetSocket) {
      io.to(targetSocket).emit("call-accepted", signal);
    }
  });

  // End call
  socket.on("end-call", ({ to }) => {
    const targetSocket = users[to];

    if (targetSocket) {
      io.to(targetSocket).emit("call-ended");
    }
  });

  // ================= DISCONNECT =================
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    // remove user from list
    for (let userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

// ================== START SERVER ==================
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});