'use strict'

const rimraf = require('rimraf')

function removeBadDeps (folderPaths, callback) {
  let amountDone = 0
  const done = () => {
    amountDone += 1
    if (amountDone === folderPaths.length) {
      callback()
    }
  }
  folderPaths.forEach((folder) => {
    rimraf(folder, done)
  })
}

module.exports = removeBadDeps
