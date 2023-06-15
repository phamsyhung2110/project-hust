const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");

const { addFriend, allFriends, rejectFriendRequest } = require("../controllers/friendControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/:userId").get(protect, allFriends);

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/rejectfriends").post(protect, rejectFriendRequest); //API reject friend request
router.route("/addfriend").post(protect, addFriend); //API add friend request



module.exports = router;
