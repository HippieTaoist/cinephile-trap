const User = require("../model/User");
const Movie = require("../../movies/model/Movie");

const bcrypt = require("bcryptjs");
const {
    isEmpty,
    isAlpha,
    isAlphanumeric,
    isEmail,
    isStrongPassword,
} = require("validator");
const jwt = require("jsonwebtoken");
const {
    createConnection
} = require("mongoose");

const errorHandler = require("../../utils/errorHandler/errorHandler");
const {
    createMovie,
    updateMovieByImdbId,
} = require("../../movies/controller/moviesController")








async function getUserInfo(req, res, next) {
    try {
        console.log(res.locals.decodedData);
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
                    expiresIn: "2400h",
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
    console.log('');
    console.log('');
    console.log('                updateUser Called');
    console.log('');
    console.log('');
    try {
        const {
            imdbID,
            likeIt,
        } = req.body
        const decodedData = res.locals.decodedData;

        let foundUser = await User.findOne({
            email: decodedData.email
        })
        let userFavoriteMovieArray = foundUser.movieFavorites
        let foundMovie = await Movie.findOne({
            imdbID: imdbID
        })


        if (!foundMovie) {
            let theMovie = await createMovie(foundUser, req.body)
            console.log("Newly Created Movie: \n", theMovie);

            userFavoriteMovieArray.push(theMovie)
            foundUser.movieFavorites = userFavoriteMovieArray
            await foundUser.save()

            // theory: had to reassign foundMovie since it was edited and saved. =>not sure how correct I am but it works.
            foundMovie = await Movie.findOne({
                imdbID: imdbID
            })
            res.json({
                message: "Newly FAVORITED Movie!! WOOT WOOT!! Thanks for adding to the server!",
                foundMovie
            })
        } else {
            let updatedMovie = await updateMovieByImdbId(foundUser, foundMovie, likeIt)
            // Promise.all((updatedMovie).then(value => {
            //     console.log(value)
            // }))

            console.log("updatedMovie:   ", updatedMovie)
            if (updatedMovie) {

                res.json({
                    message: "Updated Movie!! WOOT WOOT",
                    updatedMovie: updatedMovie,
                })
            } else {
                res.status(404).json({
                    message: "Movie Has Been Removed From Our Server"
                })
            }



        }




    } catch (err) {
        res.status(500).json({
            message: "There is an error updating your profile",
            error: err.message,
            err
        })
    }
}

module.exports = {
    getUsers,
    getUserInfo,
    createUser,
    loginUser,
    profileUser,
    updateUser
}