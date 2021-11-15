import React from "react";
import PropTypes from "prop-types";

export default function MovieLoad(props) {
  console.log(props);
  return (
    <div
      style={{
        backgroundColor: "grey",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {props.movieArray.map((movie, index) => {
        if (index < 8) {
          return (
            <div
              key={index + 1}
              id="movie-box"
              style={{ width: "20%", margin: "5%" }}
            >
              <div style={{ width: "100%" }}>
                {""}
                {index + 1}
                {movie.Title}
              </div>
              <a href={`https://www.imdb.com/title/${movie.imdbID}`}>
                <div>IMDBV: {movie.imdbID}</div>
                <div>Rating: {movie.imdbRating}</div>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  style={{ width: "100%" }}
                />
              </a>
            </div>
          );
        }
      })}
    </div>
  );
}

MovieLoad.propTypes = { movieResultsArray: PropTypes.array.isRequired };
