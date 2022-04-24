import React, { useState, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [Movies, setFetchMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isError, setIsError] = useState(false);
  //using the useEffect to fetch the data without the need to press the button for the first time.
  useEffect(() => {
    fetchMovieHandler();
  }, []);
  // we can use the async and await way to achieve the same .then method
  async function fetchMovieHandler() {
    setIsEmpty(false);
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch("https://swapi.dev/api/films");

      if (!response.ok) {
        throw new Error("something is wrong");
      }
      const data = await response.json();
      const transformedMovies = data.results.map((filmData) => {
        return {
          id: filmData.episode_id,
          openingText: filmData.opening_crawl,
          title: filmData.title,
          releaseDate: filmData.release_date,
        };
      });
      setTimeout(() => {
        setFetchMovie(transformedMovies);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsError(error.message);
      setIsLoading(false);
    }
  }
  /////////////////////////
  // function fetchMovieHandler() {
  //   setIsLoading(true);
  //   fetch("https://swapi.dev/api/films")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const transformedMovies = data.results.map((filmData) => {
  //         return {
  //           id: filmData.episode_id,
  //           openingText: filmData.opening_crawl,
  //           title: filmData.title,
  //           releaseDate: filmData.release_date,
  //         };
  //       });
  //       setFetchMovie(transformedMovies);
  //     });
  //   setIsLoading(false);
  // }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}> Fetch Movies </button>
      </section>
      <section>
        {isEmpty ? <p>No Movies to show...</p> : ""}
        {isLoading ? <p>Loading...</p> : <MoviesList movies={Movies} />}
        {isError ? <p>{isError}</p> : ""}
      </section>
    </React.Fragment>
  );
}

export default App;
