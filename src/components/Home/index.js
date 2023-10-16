import {Component} from 'react'

import Header from '../Header'

import UserStories from '../UserStories'

class Home extends Component {
  render() {
    return (
      <>
        <Header />

        <UserStories />
      </>
    )
  }
}

export default Home
