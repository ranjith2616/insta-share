import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import UserProfileDetails from '../UserProfileDetails'

import './styled.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class UserProfile extends Component {
  state = {userData: [], api: apiStatusConstraints.initial}

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    this.setState({api: apiStatusConstraints.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/insta-share/users/${id}`

    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        id: data.user_details.id,
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        postsCount: data.user_details.posts_count,
        profilePic: data.user_details.profile_pic,
        userBio: data.user_details.user_bio,
        userName: data.user_details.user_name,
        userId: data.user_details.user_id,
        posts: data.user_details.posts.map(each => ({
          id: each.id,
          image: each.image,
        })),
        stories: data.user_details.stories.map(eachStory => ({
          id: eachStory.id,
          image: eachStory.image,
        })),
      }
      this.setState({userData: updatedData, api: apiStatusConstraints.success})
    } else {
      this.setState({api: apiStatusConstraints.failure})
    }
  }

  renderSuccessView = () => {
    const {userData} = this.state

    return (
      <div className="user-profile-bg-container">
        <UserProfileDetails userDetails={userData} />
      </div>
    )
  }

  onTryAgainBtn = () => {
    this.getUserDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dmbz5iuha/image/upload/v1697467692/alert-triangle_hlc9v7.png"
        alt="failure view"
        className="alert-img"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.onTryAgainBtn}
      >
        {' '}
        Try again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="user-profile-loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderUserProfileRoute = () => {
    const {api} = this.state

    switch (api) {
      case apiStatusConstraints.success:
        return this.renderSuccessView()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      case apiStatusConstraints.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderUserProfileRoute()}</div>
      </>
    )
  }
}

export default UserProfile
