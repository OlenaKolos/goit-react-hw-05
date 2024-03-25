// import { useState, useEffect, useMemo } from "react";
// import { useSearchParams } from "react-router-dom";
// import useAxiosFetch from "../components/hooks/useAxiosFetch";
// import theMovieDbInstance from "../components/api/themoviedb-api";
// import MovieList from "../components/MovieList/MovieList";
// import SearchBar from "../components/SearchBar/SearchBar";
// import Loader from "../components/Loader/Loader";
// /*import LoadMoreMovies from '../components/LoadMoreMoview/LoadMoreMovies';*/
// import PaginateMoviesList from "../components/PaginateMoviesList/PaginationMoviesList";

// const MoviesPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const params = useMemo(
//     () => Object.fromEntries([...searchParams]),
//     [searchParams]
//   );

//   const { query, page } = params;

//   const [movies, setMovies] = useState([]);

//   const handleSearch = (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const newQuery = form.elements.query.value.trim();
//     if (newQuery === "") {
//       return;
//     }
//     setSearchParams({ query: newQuery, page: !page ? 1 : page });
//     form.reset;
//   };

//   const { data, error, isLoading } = useAxiosFetch(
//     `/search/movie?${searchParams}&include_adult=false&language=en-US`,
//     theMovieDbInstance,
//     !query ?? true
//   );

//   useEffect(() => {
//     if (data !== null) {
//       setMovies(!data.results ? [] : data.results);
//     }
//   }, [data, query, page]);

//   const loadSelectedPage = ({ selected: selectedPage }) => {
//     setSearchParams({
//       query: !query ? "" : query,
//       page: parseInt(selectedPage + 1),
//     });
//   };

//   return (
//     <>
//       <SearchBar value={query} handleSearch={handleSearch} />
//       {isLoading && <Loader />}
//       {error && <p className="error">{error}</p>}
//       {!error && !isLoading && movies.length > 0 && (
//         <>
//           <MovieList movies={movies} />
//           {data.total_pages > 1 && (
//             <PaginateMoviesList
//               onClick={loadSelectedPage}
//               pageCount={data.total_pages}
//               forcePage={page}
//             />
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default MoviesPage;

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
