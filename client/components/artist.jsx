// entry.js
import React from 'react'
import ReactDOM from 'react-dom'
import { goBack } from '../store/artist/actions'
import {connect} from 'react-redux'

import ContestContainer from './contest.jsx'

// This file contains container and presentational of the app

class Artist extends React.Component {
  render () {
    return (
      <div>
        <button
          onClick={() => this.props.goBack()}
        > Go back
        </button>

        {JSON.stringify(this.props.artist)}
      </div>
    )
  }
}

const stateProps = (state) => ({
  artist: state.artist
})

const dispatchProps = (dispatch) => ({
  goBack: () => dispatch(goBack())
})

const ArtistContainer = connect(
  stateProps,
  dispatchProps
)(Artist)

export default ArtistContainer
