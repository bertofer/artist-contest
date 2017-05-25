// entry.js
import React from 'react'
import ReactDOM from 'react-dom'
import { getContest } from '../store/contest/actions'
import {connect} from 'react-redux'

import ContestContainer from './contest.jsx'
import ArtistContainer from './artist.jsx'

// This file contains container and presentational of the app

class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <h1 className='text-center'>Who will win? Give your vote!</h1>
        {this.props.artist ? <ArtistContainer /> : <ContestContainer />}
      </div>
    )
  }
}

const stateProps = (state) => ({
  contest: state.contest,
  artist: state.artist
})

const AppContainer = connect(
  stateProps
)(App)

export default AppContainer
