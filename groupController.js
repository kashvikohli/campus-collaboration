const Group = require("../models/Group");

async function createGroup(req, res, next) {
  try {
    const { name, description = "", members = [] } = req.body;
    if (!name) return res.status(400).json({ message: "Group name is required" });
    const allMembers = [...new Set([String(req.user._id), ...members])];
    const group = await Group.create({ name, description, createdBy: req.user._id, members: allMembers });
    res.status(201).json(await group.populate("members", "name email"));
  } catch (err) { next(err); }
}

async function getGroups(req, res, next) {
  try {
    const groups = await Group.find({ members: req.user._id }).populate("members", "name email").sort({ updatedAt: -1 });
    res.json(groups);
  } catch (err) { next(err); }
}

async function addMember(req, res, next) {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, { $addToSet: { members: req.body.userId } }, { new: true }).populate("members", "name email");
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (err) { next(err); }
}

module.exports = { createGroup, getGroups, addMember };
