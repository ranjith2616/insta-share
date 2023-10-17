import './App.css'

import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import MyProfile from './components/MyProfile'

import ProtectedRoute from './components/ProtectedRoute'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/my-profile" component={MyProfile} />
    <ProtectedRoute exact path="/users/:id" component={UserProfile} />
    <ProtectedRoute component={NotFound} />
  </Switch>
)

export default App
