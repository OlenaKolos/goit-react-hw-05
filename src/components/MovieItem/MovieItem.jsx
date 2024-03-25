import PropTypes from "prop-types";
import css from "./MovieItem.module.css";
import defaultImg from "../../assets/image-not-found.png";

export default function MovieItem({ movie }) {
  const { poster_path, title, vote_average } = movie || {};

  return (
    <>
      {poster_path ? (
        <img
          className={css.movieImg}
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={title}
          width="250"
          height="350"
        />
      ) : (
        <img
          className={css.movieImg}
          src={defaultImg}
          alt="Image not found"
          width="250"
          height="350"
        />
      )}
      <div className={css.movieDescContainer}>
        <h3 className={css.movieTitle}>{title}</h3>
        <p className={css.movieText}>Rating: {vote_average.toFixed(2)}</p>
      </div>
    </>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
  }).isRequired,
};
