import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './styles.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = msg => {
    this.setState({errorMsg: msg})
  }

  onFormSubmit = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-img-card">
          <img
            src="https://res.cloudinary.com/dmbz5iuha/image/upload/v1697431928/Illustration_mcqg0x.png"
            alt="website login"
            className="login-img"
          />
        </div>

        <form className="login-form-container" onSubmit={this.onFormSubmit}>
          <div className="login-form-heading-card">
            <img
              src="https://res.cloudinary.com/dmbz5iuha/image/upload/v1697433643/logowebsite-logo_usglfr.png"
              alt="website logo"
              className="website-logo-img"
            />
            <h1 className="login-website-name"> Insta Share</h1>
          </div>

          <div className="input-container">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              id="username"
              placeholder="Enter User Name"
              className="input-ele"
              value={username}
              onChange={this.onChangeUserName}
            />

            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              id="password"
              placeholder="Enter the Password"
              className="input-ele"
              type="password"
              value={password}
              onChange={this.onChangePassword}
            />
            <p className="error-msg"> {errorMsg !== '' && errorMsg}</p>

            <button type="submit" className="submit-button">
              {' '}
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
