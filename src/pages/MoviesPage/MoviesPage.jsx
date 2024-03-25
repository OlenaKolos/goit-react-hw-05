import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";

import { fetchMoviesByQuery } from "../../components/services/tmdb-api";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query === "") {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchMoviesByQuery(query);
        if (res.length === 0) {
          setError(
            "Sorry, there are no movies matching your search query. Please try again!"
          );
        } else {
          setMovies(res);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearchQuery = (query) => {
    setSearchParams({ query });
  };

  return (
    <section>
      <div className={css.container}>
        <SearchForm onSearch={handleSearchQuery} />
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        <MovieList movies={movies} />
      </div>
    </section>
  );
}
