import {Component} from 'react'

import './App.css'

import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import MyProfile from './components/MyProfile'

import ProtectedRoute from './components/ProtectedRoute'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'

import InstaShare from './context/InstaShare'

class App extends Component {
  state = {searchData: ''}

  onSearchBtn = searchInput => {
    this.setState({searchData: searchInput})
  }

  render() {
    const {searchData} = this.state
    return (
      <InstaShare.Provider value={{searchData, onSearchBtn: this.onSearchBtn}}>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />

          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <ProtectedRoute component={NotFound} />
        </Switch>
      </InstaShare.Provider>
    )
  }
}

export default App
