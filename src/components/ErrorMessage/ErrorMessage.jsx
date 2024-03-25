import css from "./ErrorMessage.module.css";
import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => {
  return <p className={css.errorMessage}>{message}</p>;
};
export default ErrorMessage;
ErrorMessage.p;

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
