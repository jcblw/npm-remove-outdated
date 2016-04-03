'use strict'

const checkIfFile = require('./check-if-file')

function getDeps (depPath, callback) {
  checkIfFile(depPath, (err) => {
    if (err) return callback(err)

    const shrinkWrap = require(depPath)

    if (!shrinkWrap || typeof shrinkWrap !== 'object' || !shrinkWrap.dependencies) {
      return callback(new Error('current shrink-wrap file is not formatted correctly'))
    }

    callback(null, Object.keys(shrinkWrap.dependencies).reduce((accum, key) => {
      accum[key] = shrinkWrap.dependencies[key].version
      return accum
    }, {}))
  })
}

module.exports = getDeps
