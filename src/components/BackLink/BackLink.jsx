import PropTypes from "prop-types";
import css from "./BackLink.module.css";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function BackLink({ to, children }) {
  return (
    <Link to={to} className={css.backLink}>
      <BiArrowBack />
      {children}
    </Link>
  );
}
BackLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
