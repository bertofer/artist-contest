const request = require('request-promise-native')

// By having the http service as a class that can be constructed,
// is easy to mock it on the tests to not do real requests while running tests
class HttpService {
  // We only have get for now, and always uses json
  // Careful with this, json might not be always the options,
  // Don't know if request package throw error, leave for now
  async get (url) {
    return request.get({ url: url, json: true })
  }
}

module.exports = HttpService
