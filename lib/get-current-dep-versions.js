'use strict'

const path = require('path')
const getInstalledVersion = require('./get-installed-version')

function getCurrentDepVersions (deps, packagesPath, callback) {
  const size = Object.keys(deps).length
  let amountDone = 0
  const installedDeps = {}
  const erroredDeps = {}

  const done = (depName) => (err, version) => {
    amountDone += 1
    if (err) {
      erroredDeps[depName] = err
    } else {
      installedDeps[depName] = version
    }
    if (amountDone === size) {
      const hasErrors = Object.keys(erroredDeps).length
      callback(hasErrors ? erroredDeps : null, installedDeps)
    }
  }

  Object.keys(deps).forEach((depName) => {
    getInstalledVersion(
      path.resolve(packagesPath, `./${depName}/package.json`),
      done(depName)
    )
  })
}

module.exports = getCurrentDepVersions
