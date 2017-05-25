const express = require('express')
const cors = require('cors')

class App {
  constructor (controllers) {
    this._app = express()
    // Services
    this._contest = controllers.contest
    this._artist = controllers.artist
    this._user = controllers.user

    this.setupMiddlewares()
    this.setupRouting()
  }

  start (port = 3000) {
    this._server = this._app.listen(port)
  }

  stop () {
    this._server.close()
  }

  setupMiddlewares () {
    // This would be config-driven to not propagate to prod environment
    this._app.use(cors())
  }

  setupRouting () {
    this._app.use('/contest', this._contest.router())
    this._app.use('/artist', this._artist.router())
    this._app.use('/user', this._user.router())
  }
}

module.exports = App
