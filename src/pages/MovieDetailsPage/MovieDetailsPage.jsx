// import { useEffect, useState } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import useAxiosFetch from "../components/hooks/useAxiosFetch";
// import theMovieDbInstance from "../components/api/themoviedb-api";
// import getImgUrl from "../components/api/theMovieDbImg";
// import BackLink from "../components/BackLink/BackLink";
// import Loader from "../components/Loader/Loader";
// import css from "./MovieDetailsPage.module.css";

// const MovieDetailsPage = () => {
//   const [movieData, setMovieData] = useState({});
//   const { movieId } = useParams();

//   const location = useLocation();
//   const backLinkHref = location.state?.from ?? "/";

//   const params = {
//     language: "en-US",
//     include_adult: false,
//   };
//   const searchParams = new URLSearchParams(params);

//   const { data, error, isLoading } = useAxiosFetch(
//     `/movie/${movieId}?${searchParams}`,
//     theMovieDbInstance
//   );

//   useEffect(() => {
//     setMovieData(data);
//   }, [data]);

//   const vote = Math.floor(movieData.vote_average * 10);
//   const year = movieData.release_date
//     ? new Date(movieData.release_date).getFullYear()
//     : "?";

//   return (
//     <>
//       {isLoading && <Loader />}
//       {error && <p className="error">{error}</p>}

//       {!isLoading &&
//         !error &&
//         (movieData.title ? (
//           <>
//             <BackLink to={backLinkHref}>Go back</BackLink>
//             <div className={css.movieBaseInfo}>
//               <div className={css.moviePoster}>
//                 <img
//                   src={getImgUrl(movieData.poster_path)}
//                   width="500"
//                   alt={movieData.title}
//                   className={css.movieImg}
//                 />
//               </div>
//               <div className={css.movieInfo}>
//                 <h1 className={css.movieTitle}>
//                   {movieData.title} ({year})
//                 </h1>
//                 <p>User Score: {vote}%</p>
//                 <h2>Overview</h2>
//                 {movieData.overview}
//                 <h2>Genres</h2>
//                 {movieData.genres && (
//                   <p className="genres">
//                     {" "}
//                     {movieData.genres.map((genre) => {
//                       return <span key={genre.id}>{genre.name}</span>;
//                     })}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <h3>Additional information</h3>
//             <ul>
//               <li>
//                 <Link to="cast" state={{ from: backLinkHref }}>
//                   Cast
//                 </Link>
//               </li>
//               <li>
//                 <Link to="reviews" state={{ from: backLinkHref }}>
//                   Reviews
//                 </Link>
//               </li>
//             </ul>
//             <Outlet />
//           </>
//         ) : (
//           <p className="info">No data to display</p>
//         ))}
//     </>
//   );
// };

// export default MovieDetailsPage;

import { useEffect, useState } from "react";
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
  const backLinkHref = location.state?.from.pathname ?? "/movies";

  //const backLinkHref = location.state?.from ?? "/movies";
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
        <BackLink to={backLinkHref}>Back</BackLink>
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
