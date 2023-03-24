const { verify } = require("jsonwebtoken");
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Update method
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE method
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id); //Find this user id in DB User and delete
    res.status(200).json("User has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});
//Read(get user) method
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id); //Find this user id in DB User
    const { password, ...other } = user._doc; //Because user object is mongo document, not js object, so must use attribute _doc to get user attribute
    console.log("Check pw: ", ...other);
    res.status(200).json({ other });
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get all user
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find(); //Find all user id in DB User, if have query new=true, return latest user
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get user stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } }, // Filter data created 1 year ago
      {
        $project: { // create new field with month data
          month: { $month: "$createdAt" }, // $month uses for get month data from $match
        },
      },
      {
        $group: { // grouping data
          _id: `$month`, // use this field to group data
          total: { $sum: 1 }, // sum of data per group 
        },
      },
    ])
    res.status(200).json(data);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;
