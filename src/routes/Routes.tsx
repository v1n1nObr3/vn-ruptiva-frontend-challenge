import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import MainPage from '../components/mainpage/MainPage'
import UserPage from '../components/userpage/UserPage'

interface RouteProps {
  isLogged: boolean
}

//--------------------------------------------------------------------------------
const Routes: React.FC<RouteProps> = (props) => {
  //----------------------------------------------------------------------------
  const isLogged = props.isLogged
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  if (isLogged) {
    return (
      <Switch>
        <Route exact path='/users' children={<UserPage />} />
        <Redirect to='/users' />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route exact path='/' children={<MainPage />} />
        <Redirect to='/' />
      </Switch>
    )
  }
  //----------------------------------------------------------------------------
}
//--------------------------------------------------------------------------------

export default Routes
