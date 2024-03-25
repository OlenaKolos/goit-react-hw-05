import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";
import MovieItem from "../MovieItem/MovieItem";
import PropTypes from "prop-types";

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <>
      {movies.length > 0 && (
        <ul className={css.moviesContainer}>
          {movies.map((movie) => (
            <li key={movie.id} className={css.movieItem}>
              <Link
                className={css.movieLink}
                to={`/movies/${movie.id}`}
                state={{ from: location }}
              >
                <MovieItem movie={movie} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};
