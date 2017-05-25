import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import './styles.scss' // global styles import

// Reducers
import Reducers from './store/reducers'
import Epics from './store/epics'
const epicMiddleware = createEpicMiddleware(Epics)
// App component
import AppContainer from './components/app.jsx'

let store = createStore(
    Reducers,
    applyMiddleware(epicMiddleware)
  )

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('react-root')
)
