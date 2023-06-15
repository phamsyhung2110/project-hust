const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public

// Hàm allUsers dùng cho search user, nó lấy keyword từ request,
// /api/user?search=, nếu ko tìm thấy sẽ trả về rỗng
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const addFriend = asyncHandler(async (req, res) => {
  const { friendId, _id } = req.body;

  if (!friendId) {
    res.status(400);
    throw new Error("Friend ID is required");
  }

  //Tìm user đang đăng nhập trong DB
  const currentUser = await User.findById(_id);

  //Tìm trong danh sách bạn bè của user hiện tại
  const findFriend = currentUser.friends.includes(friendId);
  //Tìm user trong DB từ friendId
  const friend = await User.findById(friendId);

  console.log("User: ", currentUser)
  console.log("Friend: ", friend)

  //Nếu ko thấy user từ friendId thì báo user notfound
  if (!friend) {
    res.status(404);
    throw new Error("User not found");
  }
  //Nếu user ID đã tồn tại trong danh sách friend thì báo đã tồn tại
  if (findFriend) {
    res.status(404);
    throw new Error("Friend already exists");
  }

  //Lưu lại friend Id vào danh sách friend
  //của user hiện tại
  currentUser.friends.push(friendId);
  await currentUser.save();

  //Trả về tất cả danh sách bạn bè của user hiện tại sau khi add friend
  res.status(200).json({
    message: "Friend added successfully",
    friends: currentUser.friends,
  });
});


const allFriends = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.params.userId).populate("friends", "-password");;

  if (!currentUser) {
    res.status(404)
    throw new Error("Current user not found or being deleted");
  }
  res.status(200).json(currentUser.friends);
  // res.status(200).json(req.user.friends);
})

module.exports = { allUsers, registerUser, authUser, addFriend, allFriends };
