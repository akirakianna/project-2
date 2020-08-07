import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './styles/style.scss'

import HomePage from './components/HomePage'
import RandEI from './components/RandEI'
import MigrationArtists from './components/Migration'
import SouthernGothic from './components/SouthernGothic'
import NavBar from './components/NavBar'
import About from './components/About'

const App = () => {

  //* Is listening for route changes and when these endpoints are selected or 'hit', it will render the component which is assigned to it.
  return <HashRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/randei" component={RandEI} />
      <Route exact path="/migration" component={MigrationArtists} />
      <Route exact path="/sg" component={SouthernGothic} />
      <Route exact path="/about" component={About} />
    </Switch>
  </HashRouter>
}


export default App


