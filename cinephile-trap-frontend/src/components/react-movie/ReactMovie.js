import { useState, useEffect } from "react";

import axios from "axios";
import Loading from "../common/Loading";
import MovieLoad from "../movieload/MovieLoad";
import TheErr from "../error-handle/TheErr";
import MovieResults from "./movieResults/MovieResults";

export default function ReactMovie() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imdb, setImdb] = useState("tt0113243");
  const [movieArray, setMovieArray] = useState([]);
  const [search, setSearch] = useState("Batman");

  async function fetchMovieByName() {
    let payload = await axios.get(
      `http://omdbapi.com/?s=${search}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`,
      {
        params: {
          _Limit: 8,
        },
      }
    );

    let movieImdbIdArray = payload.data.Search.map((item) => item.imdbID);

    let promiseMovieArray = movieImdbIdArray.map(async (imdbID) => {
      return fetchMovieByImdb(imdbID);
    });

    Promise.all(promiseMovieArray)
      .then((result) => {
        console.log(result);
        setMovieArray(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function fetchMovieByImdb(imdb) {
    let fetchMovie = await axios.get(
      `http://www.omdbapi.com/?i=${imdb}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
    );
    // console.log(fetchMovie);
    return fetchMovie;
  }

  function handleOnClick() {
    fetchMovieByName();
  }
  //   useEffect(() => {
  //     handleOnClick();
  //   }, [handleOnClick]);

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

//   async function applyMovieRating(movieArray) {
//     let movieResult = await axios.get(
//       `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
//     );
//     let movieResultRating = Object.assign({}, movieResult);
//     console.log(movieResultRating);
//     // ;

//     return resultingArray;

//     let movies = [...movieArray];

//     movies[index] = movie;
//     setMovieArray(movies);
//   }
