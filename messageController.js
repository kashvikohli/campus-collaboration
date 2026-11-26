const Message = require("../models/Message");
const Group = require("../models/Group");

async function getMessages(req, res, next) {
  try {
    const group = await Group.findOne({ _id: req.params.groupId, members: req.user._id });
    if (!group) return res.status(404).json({ message: "Group not found or access denied" });
    const messages = await Message.find({ group: group._id }).populate("sender", "name email").sort({ createdAt: 1 }).limit(200);
    res.json(messages);
  } catch (err) { next(err); }
}

async function sendMessage(req, res, next) {
  try {
    const { text } = req.body;
    const group = await Group.findOne({ _id: req.params.groupId, members: req.user._id });
    if (!group) return res.status(404).json({ message: "Group not found or access denied" });
    if (!text || !text.trim()) return res.status(400).json({ message: "Message text is required" });
    const message = await Message.create({ group: group._id, sender: req.user._id, text: text.trim() });
    const populated = await message.populate("sender", "name email");
    req.app.get("io").to(`group:${group._id}`).emit("newMessage", populated);
    res.status(201).json(populated);
  } catch (err) { next(err); }
}

module.exports = { getMessages, sendMessage };
