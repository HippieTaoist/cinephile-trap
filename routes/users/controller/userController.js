const User = require("../model/User");

const bcrypt = require("bcryptjs");

const {
    isEmpty,
    isAlpha,
    isAlphanumeric,
    isEmail,
    isStrongPassword,
} = require("validator");

const jwt = require("jsonwebtoken");

const errorHandler = require("../../utils/errorHandler/errorHandler");
const {
    createConnection
} = require("mongoose");

async function getUserInfo(req, res, next) {
    try {
        const decodedData = res.locals.decodedData;
        const foundUser = await User.findOne({
                email: decodedData.email,
            })
            .populate("movieFavorites", "-movieFan -_v")
            .exec();

        res.json({
            message: "Successfully retrieved",
            payload: foundUser,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error in Getting User Information",
            error: errorHandler(err),
        });
    }
}
async function getUsers(req, res) {
    try {
        let payload = await User.find(req.body);

        res.json({
            message: "Successfully retrieved",
            payload: payload,
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed Fetching",
            error: err
        });
    }
}

async function createUser(req, res) {
    const {
        firstName,
        lastName,
        username,
        email,
        password
    } = req.body;

    try {
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
        });

        let savedUser = await createdUser.save();

        res.json({
            message: "Successful",
            payload: savedUser
        });
    } catch (err) {
        res
            .status(500)
            .json({
                message: "Error in Creating User",
                error: errorHandler(err)
            });
    }
}




module.exports = {
    getUsers,
    createUser,
}