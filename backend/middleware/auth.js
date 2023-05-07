const jwt = require("jsonwebtoken");
const User = require("../model/user");

const auth = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Silahkan Login Dahulu" });
  }

  const token = authorization.split(" ")[1];
  const data = await jwt.verify(token, process.env.JWT_SECRET);
  console.log(data);
  req.user = {
    userId: data.userId,
    username: data.username,
  };
  next();
};

module.exports = auth;
