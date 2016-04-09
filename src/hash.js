var murmur = require('murmurhash')

module.exports = function hash (json) {
  return murmur(JSON.stringify(json))
}
