import { useState, useEffect } from "react";

import axios from "axios";
import Loading from "../common/Loading";
import MovieLoad from "../movieload/MovieLoad";
import TheErr from "../error-handle/TheErr";
import MovieResults from "./movie-results/MovieResults";

export default function ReactMovie() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imdb, setImdb] = useState("tt0113243");
  const [movieArray, setMovieArray] = useState([]);
  const [search, setSearch] = useState("");

  async function fetchMovieByImdb(imdb) {
    let fetchMovie = await axios.get(
      `http://www.omdbapi.com/?=${imdb}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
    );
  }

  async function fetchMovieByName() {
    console.log(search);
    let result = await axios.get(
      `http://omdbapi.com/?s=${search}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`,
      {
        params: {
          _Limit: 8,
        },
      }
    );
    console.log(result);
    setMovieArray(result.data.Search);
    console.log(movieArray);
  }

  //   async function applyMovieRating(imdb) {}

  function handleOnClick() {
    fetchMovieByName();
  }

  function handleEnterPress(e) {
    console.log("handleEnterPress");
    console.log(e.target.value);
    if (e.which === 13) {
      handleOnClick();
    }
  }

  function handleOnChange(e) {
    setSearch(e.target.value);
  }

  return (
    <div>
      <input
        name="search"
        id="search"
        placeholder="Enter Movie Name Here"
        onKeyPress={handleEnterPress}
        onChange={handleOnChange}
      />
      <hr />

      <MovieLoad movieArray={movieArray} />
    </div>
  );
}
