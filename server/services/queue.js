// Mocked representation of a queue to interconnect different controllers and
// models.
// It is a way to not couple modules between them
// Very simple, does not even implement locking or anything like that
const EventEmitter = require('events').EventEmitter

class Queue extends EventEmitter {
  constructor () {
    super()
    this._queue = []
  }

  push (item) {
    this._queue.push(item)
    // make async
    process.nextTick(() => this.emit('elements'))
  }

  pop () {
    if (this._queue.length > 0) {
      const res = this._queue[0]
      this._queue = this._queue.slice(1)
      return res
    }
    return null
  }

  first () {
    return this._queue[0]
  }
}

module.exports = Queue
