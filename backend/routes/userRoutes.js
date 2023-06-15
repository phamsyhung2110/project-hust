const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  addFriend,
  allFriends
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/:userId").get(protect, allFriends);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/addfriend").post(addFriend);


module.exports = router;
