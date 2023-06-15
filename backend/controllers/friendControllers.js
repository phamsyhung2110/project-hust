const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


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
    // Kiểm tra xem đã gửi lời mời kết bạn cho friendId chưa
    const isRequested = currentUser.requested.includes(friendId);
    if (isRequested) {
      res.status(400);
      throw new Error('Friend request already sent');
    }
  
    // Kiểm tra xem đã nhận được lời mời kết bạn từ friendId chưa
    const isFriendRequest = currentUser.friendRequests.includes(friendId);
    if (isFriendRequest) {
      res.status(400);
      throw new Error('Friend request already received');
    }
  
    //Lưu lại friend Id vào danh sách friend
    //của user hiện tại
    // currentUser.friends.push(friendId);
    friend.friendRequests.push(_id); // Lưu id của người gửi vào friendRequest của người nhận
    currentUser.requested.push(friendId); // Lưu người nhận vào danh sách đã gửi lời mờ
  
    await currentUser.save();
    await friend.save();
    //Trả về tất cả danh sách sau khi gửi lời mời
    res.status(200).json({
      message: "Sent friend request",
      friends: currentUser.friends,
      requested: currentUser.requested,
      friendRequests: friend.friendRequests,
    });
  });
  
  
  const allFriends = asyncHandler(async (req, res) => {
    //Tìm user đang đăng nhập hiện tại và thông tin bạn bè trong danh sách
    const currentUser = await User.findById(req.params.userId).populate("friends", "-password");;
  
    if (!currentUser) {
      res.status(404)
      throw new Error("Current user not found or being deleted");
    }
    res.status(200).json(currentUser.friends);
    // res.status(200).json(req.user.friends);
  })

  const rejectFriendRequest = asyncHandler(async (req, res) => {
    const { friendId, _id } = req.body;
  
    if (!friendId) {
      res.status(400);
      throw new Error('Friend ID is required');
    }
  
    const currentUser = await User.findById(_id);
    const friend = await User.findById(friendId);
    console.log("curent User reject: ", currentUser)
    console.log("Friend reject: ", friend)
    if (!friend) {
      res.status(404);
      throw new Error('User not found');
    }

    // Kiểm tra xem đã nhận được lời mời kết bạn từ friendId chưa
    const isFriendRequest = currentUser.friendRequests.includes(friendId);
    if (!isFriendRequest) {
      res.status(400);
      throw new Error('Friend request not found');
    }
  
    // Loại bỏ lời mời kết bạn
    currentUser.friendRequests = currentUser.friendRequests.filter(
      (requestId) => requestId.toString() !== friendId
    );
    friend.requested = friend.requested.filter(
      (requestId) => requestId.toString() !== _id
    );
  
    await currentUser.save();
    await friend.save();
  
    res.status(200).json({
      message: 'Friend request rejected successfully',
      friendRequests: currentUser.friendRequests,
    });
  });
  

  module.exports = { addFriend, allFriends,rejectFriendRequest };