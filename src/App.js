import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // get data from star wars
  async function fetchMoviesHandler2() {
    // change loading state
    setIsLoading(true);
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
    setIsLoading(false);
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
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>No Force is with you</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
