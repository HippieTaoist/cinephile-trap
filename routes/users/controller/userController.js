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

async function loginUser(req, res) {
    const {
        email,
        username,
        password,
    } = req.body;

    try {

        let foundUserEmail = await User.findOne({
            email: email,
        })
        // let foundUserUsername = await User.findOne({
        //     username: username,
        // })

        if (!foundUserEmail) {
            return res.status(500).json({
                message: "Error in Logging In User",
                error: " Go SIgn UP",
            })
        } else {
            let comparedPassword = await bcrypt.compare(password, foundUserEmail.password);
            if (!comparedPassword) {
                return res.status(500).json({
                    message: "error",
                    error: "Please check email and password",
                });
            } else {
                let jwtToken = jwt.sign({
                    email: foundUserEmail.email,
                    username: foundUserEmail.username,
                }, process.env.SECRET_KEY, {
                    expiresIn: "24h",
                });
                return res.json({
                    message: "Success Tokenizing",
                    payload: jwtToken,
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "Login Error.. WHAT DID YOU DO!!!!",
            error: err.message
        })
    }


}

async function profileUser(req, res) {

    try {
        let decodedToken = jwt.decode(req.body.token, process.env.SECRET_KEY);

        res.json({
            token: decodedToken
        })
    } catch (err) {
        res.status(500).json({
            message: "There is an error pulling your profile",
            error: err.message,
        })
    }

}

async function updateUser(req, res) {
    try {


        res.json({
            message: "Update WOOT WOOT!!"
        })
    } catch (err) {
        res.status(500).json({
            message: "There is an error updating your profile",
            error: err.message
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    loginUser,
    profileUser,
    updateUser
}