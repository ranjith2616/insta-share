import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import MyProfileDetails from '../MyProfileDetails'

import './styles.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class MyProfile extends Component {
  state = {myProfileData: [], api: apiStatusConstraints.initial}

  componentDidMount() {
    this.getMyProfileData()
  }

  getMyProfileData = async () => {
    this.setState({api: apiStatusConstraints.inProgress})

    const url = 'https://apis.ccbp.in/insta-share/my-profile'

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
        id: data.profile.id,
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        userBio: data.profile.user_bio,
        userName: data.profile.user_name,
        userId: data.profile.user_id,
        posts: data.profile.posts.map(each => ({
          id: each.id,
          image: each.image,
        })),
        stories: data.profile.stories.map(eachStory => ({
          id: eachStory.id,
          image: eachStory.image,
        })),
      }
      this.setState({
        myProfileData: updatedData,
        api: apiStatusConstraints.success,
      })
    } else {
      this.setState({api: apiStatusConstraints.failure})
    }
  }

  renderSuccessView = () => {
    const {myProfileData} = this.state

    const {match} = this.props
    const {path} = match

    return (
      <div className="profile-bg-container">
        <MyProfileDetails userDetails={myProfileData} path={path} />
      </div>
    )
  }

  onTryAgainBtn = () => {
    this.getMyProfileData()
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

  renderMyProfileRoute = () => {
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

        <div>{this.renderMyProfileRoute()}</div>
      </>
    )
  }
}

export default MyProfile
