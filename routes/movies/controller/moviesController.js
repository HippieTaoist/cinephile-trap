const {
    findByIdAndUpdate
} = require("../model/Movie");
const Movie = require("../model/Movie");


async function createMovie(favoritingOwner, movie) {
    let newID = movie.imdbID
    const theMovie = new Movie({
        createdByCinephile: favoritingOwner._id,
        cinephiles: [favoritingOwner._id],
        imdbID: movie.imdbID,
        imdbLink: movie.imdbLink,
        movieTitle: movie.movieTitle,
        moviePosterUrl: movie.moviePosterUrl,
    })
    await theMovie.save()
    return theMovie;
};



async function updateMovieByImdbId(updatingUser, movieToBeUpdated, isLiked) {
    console.log("");
    console.log('                    updateMovieByImdbId Called');
    console.log("");


    let incomingMovieCinephileArray = movieToBeUpdated.cinephiles

    if (isLiked) {
        if (incomingMovieCinephileArray.includes(updatingUser._id)) {
            console.log(`I love ${movieToBeUpdated.movieTitle} and still do.`);
            return movieToBeUpdated
        } else {
            console.log(`So excited to get get ${movieToBeUpdated.movieTitle} in my inventory`);
            let updatedMovie = await Movie.findByIdAndUpdate(movieToBeUpdated._id, {
                $push: {
                    cinephiles: updatingUser._id
                }
            }, {
                new: true
            })
            console.log("I am liked");
            return updatedMovie;
        }
    } else {
        if (incomingMovieCinephileArray.includes(updatingUser._id)) {
            console.log(`Prepare to be removed from my favorites, ${movieToBeUpdated.movieTitle}`);
            let updatedMovie = await Movie.findByIdAndUpdate(movieToBeUpdated._id, {
                $pull: {
                    cinephiles: updatingUser._id
                }
            }, {
                new: true
            })
            return updatedMovie;
        } else {
            console.log(`I don't even like ${movieToBeUpdated.movieTitle}, what Am I doing here?@!`);
            return movieToBeUpdated
        }
        console.log("I am not liked");
    }
}






// function getFavoriteMovies,
// function deleteMovieByImdbId,


module.exports = {
    createMovie,
    updateMovieByImdbId,
}








////////////////////////////////////////////
// let foundCinephiles = movieToBeUpdated.cinephiles;
// console.log("cinephiles", foundCinephiles);
// let updatingUserID = updatingUser._id.toString();

// if (foundCinephiles.length > 0) {

//     foundCinephiles.forEach(cinephile => {

//         if (cinephile.toString() === updatingUserID) {
//             console.log('');
//             console.log(`${updatingUser.username} is my name and ${movieToBeUpdated.movieTitle} is my movie bitches `)
//             console.log('');
//             if (isLiked) {
//                 console.log("Like It So Much I Saved It twice.");
//             }
//             if (isLiked === false) {
//                 let filteredCinephiles = foundCinephiles.filter(cinephile => !cinephile)

//                 // foundCinephiles.findOneAndUpdate({
//                 //     _id: movieToBeUpdated._id
//                 // }, {
//                 //     $pull: {
//                 //         _id: updatingUserID,
//                 //     }
//                 // })

//                 console.log(filteredCinephiles);

//                 movieToBeUpdated.cinephiles = filteredCinephiles
//                 console.log(`GoodBye ${movieToBeUpdated.movieTitle}... You have been Unfavorited`);
//                 let favoritedMoviesArray = updatingUser.movieFavorites
//                 let filteredMovies = favoritedMoviesArray.filter(movieToBeUpdated => !movieToBeUpdated)
//                 updatingUser.movieFavorites = filteredMovies
//                 updatingUser.save()
//                 // movieToBeUpdated.save()
//                 return movieToBeUpdated

//             }


//             // foundCinephiles.push(cinephile);
//             // console.log("First Time Liking, Long Time Loving...");
//             // let addToCinephiles = [...foundCinephiles, updatingUser]

//             // console.log(addToCinephiles);
//             // foundCinephiles.push(updatingUser)
//         } else {
//             console.log(`New Cinephile: ${updatingUser.username}`);
//             let cinephiles = movieToBeUpdated.cinephiles
//             cinephiles.push(updatingUser._id)
//             // Movie.findByIdAndUpdate(movieToBeUpdated._id, {
//             //     $push: {
//             //         cinephiles: updatingUser._id
//             //     }
//             // }, {
//             //     new: true,
//             //     upsert: true,
//             // }, )
//             movieToBeUpdated.cinephiles = cinephiles;
//             console.log(`New Cinephile for ${movieToBeUpdated}`);

//         }
//     })
// } else {
//     console.log(`You, ${movieToBeUpdated.movieTitle} are an anomaly and must be DELETED!!`);
//     Movie.deleteOne({
//         "_id": movieToBeUpdated._id
//     });
//     console.log(`Now - ${movieToBeUpdated.movieTitle}, you are dismissed to the void, you are theOne,no more`);

// }

// if (!movieToBeUpdated) {
//     // movieToBeUpdated.save()
//     return "Movie Was Removed!";
// } else {
//     // let updatedMovie = await Movie.findByIdAndUpdate(movieToBeUpdated._id, {
//     //     cinephiles: movieToBeUpdated.
//     // })
//     movieToBeUpdated.save();
//     return movieToBeUpdated
// }