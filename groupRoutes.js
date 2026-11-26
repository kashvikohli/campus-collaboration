const router = require("express").Router();
const { createGroup, getGroups, addMember } = require("../controllers/groupController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);
router.route("/").post(createGroup).get(getGroups);
router.post("/:id/members", addMember);
module.exports = router;
