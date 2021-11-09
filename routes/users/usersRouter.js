const jwt = require("jsonwebtoken");
var express = require("express");
var router = express.Router();

const {
    createUser,
    getUsers,
    loginUser,
    profileUser,
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

router.post("/create-user", checkIsUndefined, checkIsEmpty, validateCreateData, createUser)

router.post("/login-user", checkIsUndefined, checkIsEmpty, validateLoginData, loginUser)
router.get("/profile-user", profileUser)


module.exports = router;