'use strict'

const checkIfFile = require('./check-if-file')

function getDeps (depPath, isPkg, callback) {
  checkIfFile(depPath, (err) => {
    if (err) return callback(err)

    const pkgConfig = require(depPath)
    const isProperlyFormatted = pkgConfig && typeof pkgConfig === 'object' && pkgConfig.dependencies
    if (!isProperlyFormatted) {
      return callback(new Error(`"${depPath}" is not formatted correctly`))
    }

    callback(null, Object.keys(pkgConfig.dependencies).reduce((accum, key) => {
      accum[key] = isPkg ? pkgConfig.dependencies[key] : pkgConfig.dependencies[key].version
      return accum
    }, {}))
  })
}

module.exports = getDeps
