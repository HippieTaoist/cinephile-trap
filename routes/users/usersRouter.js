const jwt = require("jsonwebtoken");
var express = require("express");
var router = express.Router();

const {
  createUser,
  getUsers,
  loginUser,
  userProfile,
  updateUser,
  getUserInfo,
} = require("./controller/userController");

const {
  checkIsEmpty,
  checkIsUndefined,
  validateCreateData,
  validateLoginData,
  jwtMiddleware,
} = require("./lib/authMiddleware/index");

router.get("/", function (req, res) {
  "IM A HOME PAGE";
});

module.exports = router;
