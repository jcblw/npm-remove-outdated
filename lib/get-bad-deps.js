'use strict'

function getBadDeps (deps, currDeps) {
  return Object.keys(deps).reduce((accum, depName) => {
    if (deps[depName] !== currDeps[depName] && currDeps.hasOwnProperty(depName)) {
      accum[depName] = true
    }
    return accum
  }, {})
}

module.exports = getBadDeps
