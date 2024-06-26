
import { useEffect, useState, useRef } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import BackLink from "../../components/BackLink/BackLink";
import { fetchMovieDetails } from "../../components/services/tmdb-api";
import defaultImg from "../../assets/image-not-found.png";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import { format } from "date-fns";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");
  const [movie, setMovie] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieData = async () => {
      try {
        setError(null);
        setLoader(true);
        const res = await fetchMovieDetails(movieId);
        setMovie(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchMovieData();
  }, [movieId]);

  const {
    title,
    release_date,
    vote_average,
    overview,
    genres,
    poster_path,
    original_title,
  } = movie || {};

  const dateYear = (date) => {
    return format(new Date(date), "yyyy");
  };

  return (
    <section>
      <div className={css.container}>
        <BackLink to={backLinkRef.current.pathname}>Back</BackLink>
        {loader && <Loader />}
        {error && <ErrorMessage message={error} />}
        {movie && (
          <div className={css.movieContainer}>
            <div className={css.movieContainerUp}>
              <img
                width="300px"
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : defaultImg
                }
                alt={original_title}
              />
              <div className={css.movieInf}>
                <h1>{title}</h1>
                <p>
                  <span>Release year:</span>{" "}
                  {release_date && dateYear(release_date)}
                </p>
                <p>
                  <span>Rating:</span> {vote_average && vote_average.toFixed(2)}
                </p>
                <p>
                  <span>Genres:</span>{" "}
                  {genres &&
                    genres
                      .map((genre) => {
                        return genre.name;
                      })
                      .join(", ")}
                </p>
                <p>
                  <span>Overview:</span> {overview}
                </p>
              </div>
            </div>
            <div className={css.additInfoContainer}>
              <h3>Additional information</h3>
              <ul className={css.additInfoList}>
                <li>
                  <NavLink
                    to="cast"
                    className={buildLinkClass}
                    state={location.state}
                  >
                    Cast
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="reviews"
                    className={buildLinkClass}
                    state={location.state}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>
            <Outlet />
          </div>
        )}
      </div>
    </section>
  );
}
