import toast, { Toaster } from "react-hot-toast";
import css from "./SearchForm.module.css";
import PropTypes from "prop-types";

export default function SearchForm({ onSearch }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const query = form.elements.query.value.trim();

    if (query.trim() === "") {
      toast.error("Please enter search term!", { position: "top right" });
      return;
    }

    onSearch(query);
    form.reset();
  };

  return (
    <>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          autoComplete="off"
          name="query"
          autoFocus
          placeholder="Search movie"
        />
        <button className={css.searchBtn} type="submit">
          Search
        </button>
      </form>
      <Toaster />
    </>
  );
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
