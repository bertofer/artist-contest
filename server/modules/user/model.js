let currentVote = null

class UserModel {
  async getCurrentUser () {
    return {
      vote: currentVote
    }
  }

  async addVote (id) {
    if (currentVote === id) return false
    currentVote = id
    return true
  }

  // Returns the vote that has been removed
  async removeVote () {
    const res = currentVote
    currentVote = null
    return res
  }
}

module.exports = UserModel
