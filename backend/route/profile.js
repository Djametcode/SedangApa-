const express = require("express");
const route = express.Router();
const {
  addFriend,
  newChat,
  getMyChat,
  sendChat,
  deleteChat,
  createPost,
  deletePost,
  getMyPost,
  getUserById,
} = require("../controller/profile");

route.post("/add-friend/:Id", addFriend);
route.post("/create-chat", newChat);
route.get("/get-my-chat", getMyChat);
route.post("/send-chat/:Id", sendChat);
route.delete("/delete-chat/:Id", deleteChat);
route.post("/create-post/", createPost);
route.delete("/delete-post/:Id", deletePost);
route.get("/get-my-post", getMyPost);
route.get("/get-user/:Id", getUserById);
route.post("create-post/");

module.exports = route;
