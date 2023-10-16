import {Component} from 'react'
import Cookies from 'js-cookie'

import Slider from 'react-slick'

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
      slidesToShow: 3,
      slidesToScroll: 1,
    }

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {stories.map(each => (
            <div key={each.userId}>
              {' '}
              <h1> {each.userName}</h1>
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderUserStoriesRoute = () => {
    const {api} = this.state

    switch (api) {
      case apiStatusConstraints.success:
        return this.renderSuccessView()
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
