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
router.get("/my-favorite-movies", jwtMiddleware, getUserInfo)


//            function (req, res) {
//   res.json({ message: "IM A BACKEND HOME PAGE" });
// });

router.post("/create-user", checkIsUndefined, checkIsEmpty, validateCreateData, createUser)

router.post("/login-user", checkIsUndefined, checkIsEmpty, validateLoginData, loginUser)
router.get("/profile-user", jwtMiddleware, profileUser)
router.put("/update-user", jwtMiddleware, checkIsUndefined, updateUser)
// , checkIsEmpty -->>> only checks for strings. read into validator more.


module.exports = router;