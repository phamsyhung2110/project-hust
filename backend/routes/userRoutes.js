const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");

const { addFriend, allFriends, rejectFriendRequest, acceptFriendRequest } = require("../controllers/friendControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/allfriend/:userId").get(allFriends);

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/rejectfriend").post(protect, rejectFriendRequest); //API reject friend request
router.route("/acceptfriend").post(protect, acceptFriendRequest);
router.route("/addfriend").post(protect, addFriend); //API add friend request



module.exports = router;
