import React, { useState } from "react";
import PropTypes from "prop-types";
import fetchMovieByImdb from "../react-movie/ReactMovie";
import axios from "axios";

export default function MovieLoad(props) {
  // const [movieLoad, setMovieLoad] = useState([]);
  let movieLoad = props.movieArray;
  // console.log(props.movieArray);
  // let movieLoadArray = props.movieArray.map((imdbID) => {
  //   fetchMovieByImdb(imdbID);
  // });
  // console.log(movieLoadArray);

  // Promise.all(movieLoadArray)
  //   .then((result) => {
  //     console.log(result);
  //     // setMovieLoad(result);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  async function handleLikeButtonOnClick(e) {
    let jwtToken = window.localStorage.getItem("jwtToken");

    // console.log(jwtToken);
    // console.log(e);
    // console.log(e.target.id);
    // console.log(e.target.name);
    switch (e.target.id) {
      case "love-it":
        let loveIt = await axios.put(
          `http://localhost:3001/api/users/update-user`,
          {
            imdbID: e.target.name,
            likeIt: true,
          },
          // DONT FORGET TO SEND HEADERS!!!
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        console.log(loveIt);
        return loveIt;

      case "leave-it":
        let leaveIt = await axios.put(
          `http://localhost:3001/api/users/update-user`,
          {
            imdbID: e.target.name,
            likeIt: false,
          },
          // DONT FORGET TO SEND HEADERS!!!
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        console.log(leaveIt);
        return leaveIt;
    }
  }
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
      {movieLoad.map((movie, index) => {
        if (index < 8) {
          return (
            <div
              key={index + 1}
              id="movie-box"
              style={{ width: "20%", margin: "5%" }}
            >
              <div style={{ width: "100%" }}>
                {""}
                {index + 1} {movie.data.Title}
              </div>
              <a href={`https://www.imdb.com/title/${movie.data.imdbID}`}>
                <div>IMDB: {movie.data.imdbID}</div>
                <div>Rating: {movie.data.imdbRating}</div>
                <img
                  src={movie.data.Poster}
                  alt={movie.data.Title}
                  style={{ width: "100%" }}
                />
              </a>
              <div>
                <button
                  id="love-it"
                  name={movie.data.imdbID}
                  onClick={handleLikeButtonOnClick}
                >
                  >Love It!
                </button>

                <button
                  id="leave-it"
                  name={movie.data.imdbID}
                  onClick={handleLikeButtonOnClick}
                >
                  Leave It!
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

MovieLoad.propTypes = { movieResultsArray: PropTypes.array.isRequired };
