// import { Link } from "react-router-dom";

// const NotFoundPage = () => {
//   return (
//     <>
//       <p>Sorry, page not found!</p>
//       <p>
//         Start with <Link to="/">Home page</Link>
//       </p>
//     </>
//   );
// };

// export default NotFoundPage;

import { useLocation } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import BackLink from "../../components/BackLink/BackLink";

export default function NotFoundPage() {
  const location = useLocation();
  const backLink = location.state?.from ?? "/";
  return (
    <section>
      <div className={css.container}>
        <h1 className={css.notFoundTitle}>404</h1>
        <h2 className={css.notFoundSubTitle}>There is NOTHING here...</h2>
        <p className={css.notFoundText}>
          ...mayby the page you are looking for is not found or never existed.
        </p>
        <BackLink to={backLink}>Back to home</BackLink>
      </div>
    </section>
  );
}
