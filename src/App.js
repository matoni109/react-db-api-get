import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  // get data from star wars
  async function fetchMoviesHandler2() {
    // call api
    const response = await fetch("https://swapi.dev/api/films/");
    // data to JSON
    const data = await response.json();
    // map the object
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    // change state
    setMovies(transformedMovies);
  }

  // or
  const fetchMoviesHandler = () => {
    fetch("https://swapi.dev/api/films/")
      // 1st promise
      .then((response) => {
        // returns it's own promise
        return response.json();
      })
      // has now returned the js object
      .then((data) => {
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        // change state
        setMovies(transformedMovies);
      });
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler2}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
