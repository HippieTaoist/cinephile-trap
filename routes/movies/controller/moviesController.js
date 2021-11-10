const Movie = require("../model/Movie");


async function createMovie(favoritingOwner, movie) {

    console.log(favoritingOwner);

    const theMovie = new Movie({
        cinephiles: favoritingOwner.toString(),
        imdbID: movie.imdbID,
        imdbLink: movie.imdbLink,
        movieTitle: movie.movieTitle,
        moviePosterUrl: movie.moviePosterUrl,

    })


    await theMovie.save()

    return theMovie;
}

// function getFavoriteMovies,
// function deleteMovieByImdbId,
// function updateMovieByImdbId,

module.exports = {
    createMovie,
}