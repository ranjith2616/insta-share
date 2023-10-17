import './styles.css'

import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dmbz5iuha/image/upload/v1697532086/erroring_1not-found_xupory.png"
      alt="page not found"
      className="not-found-img"
    />

    <h1 className="not-found-heading"> Page Not Found</h1>
    <p>
      {' '}
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>

    <Link to="/">
      <button type="button" className="home-button">
        {' '}
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
