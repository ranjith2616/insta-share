import {Component} from 'react'

import Header from '../Header'

import UserStories from '../UserStories'
import Posts from '../Posts'

import './styles.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">
          <UserStories />
          <Posts />
        </div>
      </>
    )
  }
}

export default Home
