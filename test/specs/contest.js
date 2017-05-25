/* eslint-disable no-unused-expressions */
const expect = require('chai').expect
const App = require('../../server/modules/app')
const EmptyController = require('../utils/controller.mock')
const request = require('request-promise-native')
const Contest = require('../../server/modules/contest/')
const Queue = require('../../server/services/queue')

// utility to wait given ms before resolving
const tick = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(), ms)
})

describe('Contest', () => {
  const serverUrl = 'http://localhost:3000/'
  let contestModel
  let contestController
  let contestView
  let queue
  let app

  beforeEach(() => {
    queue = new Queue()
    contestModel = new Contest.Model(queue)
    contestView = new Contest.View()
    contestController = new Contest.Controller(contestView, contestModel)
    app = new App({
      user: new EmptyController(),
      artist: new EmptyController(),
      contest: contestController
    })
    app.start(3000)
  })

  afterEach(() => {
    app.stop()
  })

  it('receives the current list of artists for the contest', async () => {
    const expected = require('../utils/contest.fixture')
    const res = await request.get({ url: `${serverUrl}contest/current`, json: true })
    expect(res).to.deep.equal(expected)
  })

  describe('Voting', () => {
    // Probably voting is the only thing with any kind of actual logic in the API,
    // that just does not relay to another source. That is why here there is unit testing
    // for the voting, as it is synchronous right now and depends on the ContestModel
    // Normally unit test would be separated, but it's here for brevity
    let ContestModel
    beforeEach(() => {
      ContestModel = require('../../server/modules/contest/model')
    })

    it('Applies upVote', async () => {
      // by requiring again, reset any change that might have happened
      contestModel = new ContestModel(queue)
      const currentList = await contestModel.getCurrentList()
      const currentVotes = currentList[0].votes
      contestModel.voteUp(currentList[0].spotify_id)

      const modified = await contestModel.getCurrentList()
      expect(currentVotes + 1).to.equal(modified[0].votes)
    })

    it('Applied downVote', async () => {
      contestModel = new ContestModel(queue)
      const currentList = await contestModel.getCurrentList()
      const currentVotes = currentList[0].votes
      contestModel.voteDown(currentList[0].spotify_id)

      const modified = await contestModel.getCurrentList()
      expect(currentVotes - 1).to.equal(modified[0].votes)
    })
  })

  describe('Reads from queue', () => {
    let ContestModel
    beforeEach(() => {
      ContestModel = require('../../server/modules/contest/model')
    })

    it('applies upvote', async () => {
      contestModel = new ContestModel(queue)
      const currentList = await contestModel.getCurrentList()
      const currentVotes = currentList[0].votes

      queue.push({
        event: 'upvote',
        data: currentList[0].spotify_id
      })

      // time to process queue
      await tick(1)

      const modified = await contestModel.getCurrentList()
      expect(currentVotes + 1).to.equal(modified[0].votes)
    })

    it('applies downvote', async () => {
      contestModel = new ContestModel(queue)
      const currentList = await contestModel.getCurrentList()
      const currentVotes = currentList[0].votes

      queue.push({
        event: 'downvote',
        data: currentList[0].spotify_id
      })

      // time to process queue
      await tick(1)

      const modified = await contestModel.getCurrentList()
      expect(currentVotes - 1).to.equal(modified[0].votes)
    })
  })
})
