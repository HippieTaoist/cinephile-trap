import axios from "axios";
import React, { useState, useEffect } from "react";

import MovieLoad from "../movieload/MovieLoad";
import fetchMovieByImdb from "../react-movie/ReactMovie";

import CheckToken from "../../hooks/CheckToken";

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [favoriteMoviesArray, setFavoriteMoviesArray] = useState([]);

  let jwtToken = window.localStorage.getItem("jwtToken");

  const { checkJwtToken } = CheckToken();

  async function getUserInfo() {
    let payload = await axios.get(
      "http://localhost:3001/api/users/my-favorite-movies",
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    let favoriteMovies = payload.data.payload.movieFavorites.map(
      (item) => item.imdbID
    );
    console.log(payload);
    console.log(payload.data.payload.movieFavorites);
    console.log(favoriteMovies);
    // setFavoriteMoviesArray(favoriteMovies);
    // console.log(favoriteMoviesArray);

    // console.log(favoriteMoviesArray);
    let promiseFavoriteMovies = favoriteMovies.map(async (imdbID) => {
      return await axios.get(
        `http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
      );
    });
    console.log(promiseFavoriteMovies);

    Promise.all(promiseFavoriteMovies)
      .then((result) => {
        console.log(result);
        setFavoriteMoviesArray(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (checkJwtToken()) {
      getUserInfo();
    }
  });

  return (
    <div>
      <div>These are your favorite movies</div>
      <MovieLoad movieArray={favoriteMoviesArray} />{" "}
    </div>
  );
}
