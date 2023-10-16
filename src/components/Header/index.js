import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './styles.css'

import {FaSearch} from 'react-icons/fa'
import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'

class Header extends Component {
  state = {menuClicked: false}

  onMenuBtn = () => {
    this.setState({menuClicked: true})
  }

  onCloseIcon = () => {
    this.setState({menuClicked: false})
  }

  onLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {menuClicked} = this.state

    const {match} = this.props
    const {path} = match

    return (
      <>
        <div className="header-bg-container">
          <div className="responsive-container">
            <Link to="/" className="web-site-logo-container">
              <img
                src="https://res.cloudinary.com/dmbz5iuha/image/upload/v1697433643/logowebsite-logo_usglfr.png"
                alt="website logo"
                className="header-web-img"
              />
              <h1 className="header-web-name"> Insta Share</h1>
            </Link>

            <div className="header-right-side-container">
              <div className="input-card">
                <input
                  type="search"
                  placeholder="Search Caption"
                  className="search-input"
                />
                <button
                  type="button"
                  className="search-btn-icon"
                  data-testid="searchIcon"
                >
                  {' '}
                  <FaSearch />
                </button>
              </div>

              <div>
                <Link
                  to="/"
                  className={
                    path === '/' ? 'link-element active-route' : 'link-element'
                  }
                >
                  {' '}
                  Home
                </Link>
                <Link
                  to="/my-profile"
                  className={
                    path === '/my-profile'
                      ? 'link-element active-route'
                      : 'link-element'
                  }
                >
                  {' '}
                  Profile
                </Link>
                <button
                  type="button"
                  className="logout-btn"
                  onClick={this.onLogoutBtn}
                >
                  {' '}
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="hamburger-btn"
              onClick={this.onMenuBtn}
            >
              {' '}
              <FiMenu className="menu-icon" />
            </button>
          </div>
        </div>

        {menuClicked === true && (
          <div className="mobile-menu-card">
            <Link
              to="/"
              className={
                path === '/' ? 'link-element active-route' : 'link-element'
              }
            >
              {' '}
              Home
            </Link>
            <Link
              to="/my-profile"
              className={
                path === '/my-profile'
                  ? 'link-element active-route'
                  : 'link-element'
              }
            >
              {' '}
              Profile
            </Link>
            <p className="search-text"> Search</p>
            <button
              type="button"
              className="logout-btn"
              onClick={this.onLogoutBtn}
            >
              {' '}
              Logout
            </button>

            <button
              type="button"
              className="close-btn"
              onClick={this.onCloseIcon}
            >
              {' '}
              <AiFillCloseCircle className="close-icon" />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
