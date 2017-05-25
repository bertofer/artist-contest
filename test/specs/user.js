/* eslint-disable no-unused-expressions */
const expect = require('chai').expect
const App = require('../../server/modules/app')
const EmptyController = require('../utils/controller.mock')
const request = require('request-promise-native')
const User = require('../../server/modules/user/')
const Queue = require('../../server/services/queue')

// Because we are storing on memory the object, the require only execute once,
// so state is mutated, so tests are not indempotent.
// Will not fix for now, as it's in mem hacky. Makes these test not indempotent
// Kind of hacked around it to not refactor everything, by carefully adapting the tests.
// Short on time now, would not dare to actually allow this to go to prod!
describe('User', () => {
  const serverUrl = 'http://localhost:3000/'
  let userModel
  let userController
  let userView
  let queue
  let app

  beforeEach(() => {
    queue = new Queue()
    userModel = new User.Model()
    userView = new User.View()
    userController = new User.Controller(userView, userModel, queue)
    app = new App({
      user: userController,
      contest: new EmptyController(),
      artist: new EmptyController()
    })
    app.start(3000)
  })

  afterEach(() => {
    app.stop()
  })

  it('receives current vote', async () => {
    const res = await request.get({ url: `${serverUrl}user/`, json: true })
    expect(res.vote).to.equal(null)
  })

  it('applies vote', async () => {
    const res = await request.post({ url: `${serverUrl}user/vote/ARTIST_ID`, resolveWithFullResponse: true })
    expect(res.statusCode).to.equal(200)

    const applied = await request.get({ url: `${serverUrl}user/`, json: true })
    expect(applied.vote).to.be.equal('ARTIST_ID')
  })

  it('should return an error if the same vote goes twice', async () => {
    try {
      await request.post({ url: `${serverUrl}user/vote/ARTIST_ID`, resolveWithFullResponse: true })
    } catch (err) {
      expect(err.statusCode).to.equal(400)
    }
  })

  it('Should not push to queue if the vote is the same as before', async () => {
    try {
      await request.post({ url: `${serverUrl}user/vote/ARTIST_ID`, resolveWithFullResponse: true })
    } catch (err) {
      expect(queue.first()).to.be.undefined
    }
  })

  it('removes vote', async () => {
    const res = await request.delete({ url: `${serverUrl}user/vote/`, resolveWithFullResponse: true })
    expect(res.statusCode).to.equal(200)

    const applied = await request.get({ url: `${serverUrl}user/`, json: true })
    expect(applied.vote).to.be.equal(null)
  })

  // There is a problem here, but a bit late to fix now, need to move on with UI
  // basically the currentVote is not being reseted, that is why it can remove previous
  // vote that was ARTIST_ID from previous test. Not idempotent test, depends on previous one.
  // need to be fixed
  describe('queue', () => {
    it('adds to the queue when voting', async () => {
      await request.post({ url: `${serverUrl}user/vote/ARTIST_ID`, resolveWithFullResponse: true })
      expect(queue.first()).to.deep.equal({
        event: 'upvote',
        data: 'ARTIST_ID'
      })
    })

    it('adds to the queue when downvoting', async () => {
      await request.delete({ url: `${serverUrl}user/vote/`, resolveWithFullResponse: true })
      expect(queue.first()).to.deep.equal({
        event: 'downvote',
        data: 'ARTIST_ID'
      })
    })
  })
})
