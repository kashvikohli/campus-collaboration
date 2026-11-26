const router = require("express").Router();
const { getMessages, sendMessage } = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);
router.get("/:groupId", getMessages);
router.post("/:groupId", sendMessage);
module.exports = router;
