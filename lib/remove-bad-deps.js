'use strict'

const rimraf = require('rimraf')

function removeBadDeps (folderPaths, callback) {
  let amountDone = 0
  const errors = []
  const done = (err, version) => {
    amountDone += 1
    if (err) errors.push(err)
    if (amountDone === folderPaths.length) {
      callback(errors.length ? errors : null)
    }
  }
  folderPaths.forEach(folder => {
    rimraf(folder, done)
  })
}

module.exports = removeBadDeps
