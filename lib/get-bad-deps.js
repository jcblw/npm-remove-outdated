'use strict'

const semver = require('semver')

function getBadDeps (deps, currDeps, isPkg) {
  return Object.keys(deps).reduce((accum, depName) => {
    if (deps[depName] !== currDeps[depName] && currDeps.hasOwnProperty(depName)) {
      accum[depName] = isPkg ? !semver.satisfies(currDeps[depName], deps[depName]) : true
    }
    return accum
  }, {})
}

module.exports = getBadDeps
