// This mock serves as an empty module to use when testing other modules.
// For instance, if testing metadata endpoints, this module can be used
// as the concert and contest modules when initializing the server
const Router = require('express').Router

class EmptyController {
  router () {
    return new Router()
  }
}

module.exports = EmptyController
