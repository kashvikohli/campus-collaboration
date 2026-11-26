const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Group = require("../models/Group");

module.exports = function registerSocketHandlers(io) {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Authentication token required"));
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return next(new Error("User not found"));
      socket.userId = String(user._id);
      next();
    } catch (err) { next(new Error("Socket authentication failed")); }
  });

  io.on("connection", async (socket) => {
    await User.findByIdAndUpdate(socket.userId, { isOnline: true });
    socket.broadcast.emit("userOnline", { userId: socket.userId });

    socket.on("joinGroup", async (groupId) => {
      const group = await Group.findOne({ _id: groupId, members: socket.userId });
      if (group) socket.join(`group:${groupId}`);
    });

    socket.on("typing", (groupId) => {
      socket.to(`group:${groupId}`).emit("userTyping", { userId: socket.userId, groupId });
    });

    socket.on("disconnect", async () => {
      await User.findByIdAndUpdate(socket.userId, { isOnline: false });
      socket.broadcast.emit("userOffline", { userId: socket.userId });
    });
  });
};
