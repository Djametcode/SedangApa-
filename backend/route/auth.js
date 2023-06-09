const express = require("express");
const route = express.Router();
const { register, login, getAllUser } = require("../controller/user");
const { getAllPost } = require("../controller/universal");

route.post("/regist", register);
route.post("/login", login);
route.get("/get-all-user", getAllUser);
route.get("/get-all-post", getAllPost);

module.exports = route;
