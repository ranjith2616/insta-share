import {Component} from 'react'
import Cookies from 'js-cookie'

import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import './styles.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class UserStories extends Component {
  state = {stories: [], api: apiStatusConstraints.initial}

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    this.setState({api: apiStatusConstraints.inProgress})

    const url = 'https://apis.ccbp.in/insta-share/stories'

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
      const updatedData = data.users_stories.map(each => ({
        userId: each.user_id,
        storyUrl: each.story_url,
        userName: each.user_name,
      }))
      this.setState({api: apiStatusConstraints.success, stories: updatedData})
    } else {
      this.setState({api: apiStatusConstraints.failure})
    }
  }

  renderSuccessView = () => {
    const {stories} = this.state

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {stories.map(each => (
            <div key={each.userId} className="slides-card">
              <img src={each.storyUrl} alt="user story" className="story-img" />
              <h1 className="user-name"> {each.userName}</h1>
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  onTryAgainBtn = () => {
    this.getUserStories()
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
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderUserStoriesRoute = () => {
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
      <div className="user-stories-bg-container">
        {this.renderUserStoriesRoute()}
      </div>
    )
  }
}

export default UserStories
