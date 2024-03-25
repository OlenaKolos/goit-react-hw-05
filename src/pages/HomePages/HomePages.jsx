// import { useState, useEffect } from "react";
// import useAxiosFetch from "../components/hooks/useAxiosFetch";
// import theMovieDbInstance from "../components/api/themoviedb-api";
// import MovieList from "../components/MovieList/MovieList";
// import Loader from "../components/Loader/Loader";

// const HomePage = () => {
//   const [movies, setMovies] = useState([]);

//   const params = {
//     language: "en-US",
//     include_adult: false,
//     page: 1,
//   };
//   const searchParams = new URLSearchParams(params);

//   const { data, error, isLoading } = useAxiosFetch(
//     `/trending/movie/day?${searchParams}`,
//     theMovieDbInstance
//   );

//   useEffect(() => {
//     setMovies(data.results);
//   }, [data]);

//   return (
//     <>
//       <h1>Trending today</h1>
//       {isLoading && <Loader />}
//       {error && <p className="error">{error}</p>}
//       {!isLoading &&
//         !error &&
//         (movies.length ? (
//           <MovieList movies={movies} />
//         ) : (
//           <p className="info">No movies to display!</p>
//         ))}
//     </>
//   );
// };

// export default HomePage;

import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { fetchTrending } from "../../components/services/tmdb-api";

import css from "./HomePages.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setError(null);
        setLoader(true);
        setMovies([]);
        const res = await fetchTrending();
        setMovies(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchTrendingMovies();
  }, []);
  return (
    <section>
      <div className={css.container}>
        <h1>Trending today</h1>
        {loader && <Loader />}
        {error && <ErrorMessage message={error} />}
        <MovieList movies={movies} />
      </div>
    </section>
  );
}
