const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({ msg: "Please fill all requipment" });
    }

    const user = await User.create({ ...req.body });
    return res.status(200).json({ msg: "Success registrasi", user });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ msg: "Please fill requipment" });
    }

    const user = await User.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (!isMatch) {
      return res.status(401).json({ msg: "Password Wrong" });
    }

    const token = await jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    return res.status(200).json({ msg: "Login success", user, token });
  } catch (error) {
    console.log(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.find({});
    const formatUser = user.map((item) => ({
      id: item._id,
      username: item.user,
      email: item.email,
      friends: item.friends,
      avatar: item.avatar,
      post: item.post,
    }));

    return res.status(200).json({ formatUser });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login, getAllUser };
