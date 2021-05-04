import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // get data from star wars

  // async function fetchMoviesHandler2() {
  const fetchMoviesHandler2 = useCallback(async () => {
    // change loading state
    const yourDB =
      "https://react-db-api-default-rtdb.asia-southeast1.firebasedatabase.app";
    //
    setIsLoading(true);
    setError(null);
    try {
      // call api
      const response = await fetch(`${yourDB}/movies.json`);
      // GET STAR WARr
      const response2 = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        console.info(response.status);
        console.info(response.statusText);
        // returns error variable below
        throw new Error(response.statusText);
      }
      // data to JSON
      const data = await response.json();
      const data2 = await response2.json();
      // get json for star wars
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      const starWars = data2.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      // console.log(fetchMoviesHandler());
      loadedMovies.reverse().push(...starWars);
      console.log(loadedMovies);

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler2();
    // list depenancies
  }, [fetchMoviesHandler2]);

  const addMovieHandler = async (movie) => {
    try {
      const response = await fetch(
        "https://react-db-api-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      fetchMoviesHandler2();
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  let content = <p>Found no movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler2}>Fetch Movies</button>
      </section>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>

      <section>
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && !error && movies.length === 0 && (
          <p>No Force is with you</p>
        )}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;

// CUT BITS:

// or
// const fetchMoviesHandler = () => {
//   fetch("https://swapi.dev/api/films/")
//     // 1st promise
//     .then((response) => {
//       // returns it's own promise
//       return response.json();
//     })
//     // has now returned the js object
//     .then((data) => {
//       const transformedMovies = data.results.map((movieData) => {
//         return {
//           id: movieData.episode_id,
//           title: movieData.title,
//           openingText: movieData.opening_crawl,
//           releaseDate: movieData.release_date,
//         };
//       });
//       // change state
//       setMovies(transformedMovies);
//     });
// };
// const fetchMoviesHandler = () => {
//   let loadedMovies = [];
//   fetch("https://swapi.dev/api/films/")
//     // 1st promise
//     .then((response) => {
//       // returns it's own promise
//       return response.json();
//     })
//     // has now returned the js object
//     .then((data) => {
//       const transformedMovies = data.results.map((movieData) => {
//         return {
//           id: movieData.episode_id,
//           title: movieData.title,
//           openingText: movieData.opening_crawl,
//           releaseDate: movieData.release_date,
//         };
//       });
//       // change state
//       // setMovies(transformedMovies);
//       console.log(transformedMovies);
//       return transformedMovies;
//     });
// };
