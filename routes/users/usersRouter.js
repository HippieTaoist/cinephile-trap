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



router.get("/", getUsers)


//            function (req, res) {
//   res.json({ message: "IM A BACKEND HOME PAGE" });
// });

router.post("/create-user", function (req, res) {})

module.exports = router;