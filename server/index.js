// This file creates all the instances and the server
const Http = require('./services/http')
const Queue = require('./services/queue')

const Artist = require('./modules/artist')
const Contest = require('./modules/contest')
const User = require('./modules/user')
const App = require('./modules/app')

const http = new Http()
const queue = new Queue()

const artistModel = new Artist.Model(http)
const artistView = new Artist.View()
const artistController = new Artist.Controller(artistView, artistModel)

const contestModel = new Contest.Model(queue)
const contestView = new Contest.View()
const contestController = new Contest.Controller(contestView, contestModel)

const userModel = new User.Model()
const userView = new User.View()
const userController = new User.Controller(userView, userModel, queue)

const app = new App({
  user: userController,
  artist: artistController,
  contest: contestController
})

app.start(3000)
