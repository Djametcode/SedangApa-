const express = require("express");
const route = express.Router();
const { register, login, getAllUser } = require("../controller/user");

route.post("/regist", register);
route.post("/login", login);
route.get("/get-all-user", getAllUser);

module.exports = route;
