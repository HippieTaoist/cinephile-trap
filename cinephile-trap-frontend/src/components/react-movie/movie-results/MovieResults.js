import React, { useState, useEffect } from "react";

export default function MovieResults({ movieArray }) {
  //   const [movieArray, setMovieArray] = useState([]);
  console.log(movieArray);

  function handleMovieResults(movieArray) {
    movieArray.forEach((movie) => {
      console.log(movie);
      return <div> {movie.Title}</div>;
    });
  }

  return <div>{handleMovieResults(movieArray)}</div>;
}
