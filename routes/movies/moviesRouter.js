var express = require("express");
var router = express.Router();

var {
    jwtMiddleware
} = require("../users/lib/authMiddleware");

const {
    createMovie,
    getFavoriteMovies,
    deleteMovieByImdbId,
    updateMovieByImdbId,
} = require("./controller/moviesController")

router.get("/", getFavoriteMovies)

router.post("/create-movie", createMovie)

router.delete("/delete-movie-by-imdbId/:id", deleteMovieByImdbId)

router.update("/update-movie-by-imdbId/:id", updateMovieByImdbId)

module.exports = router