const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    cinephiles: [{
        type: mongoose.Schema.ObjectId,
        ref: "user"
    }],
    imdbID: {
        type: String,
    },
    imdbLink: {
        type: String,
    },
    moviePosterUrl: {
        type: String,
    },
    movieTitle: {
        type: String,
    },

}, {
    timestamps: true
})


module.exports = mongoose.model("movie", userSchema);