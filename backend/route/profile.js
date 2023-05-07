const express = require("express");
const route = express.Router();
const {
  addFriend,
  newChat,
  getMyChat,
  sendChat,
  deleteChat,
} = require("../controller/profile");

route.post("/add-friend/:Id", addFriend);
route.post("/create-chat", newChat);
route.get("/get-my-chat", getMyChat);
route.post("/send-chat/:Id", sendChat);
route.delete("/delete-chat/:Id", deleteChat);

module.exports = route;
