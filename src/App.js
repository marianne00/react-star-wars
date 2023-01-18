import React, { useEffect, useState, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchMoviesHandler = useCallback(async () => {
    setisLoading(true)
    setError(null)
    
    try {
      const response = await fetch('https://swapi.py4e.com/api/films/')
      if (!response.ok) {
        throw new Error('Error: ' + response.status + ' ' + response.statusText);
      }

      const data = await response.json();
      const transformedMovies = data.results.map((result) => {
        return {
          id: result.episode_id,
          title: result.title,
          openingText: result.opening_crawl,
          releaseDate: result.release_date
        }
      })
      setMovies(transformedMovies)
    } catch(error) {
      setError(error.message);
    }
    setisLoading(false)
  }, [])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])
  

  // Content
  let content = "No movies found.";
  
  if (isLoading) {
    content = <p>Loading...</p>
  }

  if (!isLoading && movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if (!isLoading && movies.length < 1 && !error) {
    content = <p>No movies found.</p>
  }

  if (!isLoading && error) {
    content = <p>{error}</p>
  }

  return (
    <React.Fragment>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
