'use strict'

const checkIfFile = require('./check-if-file')

function getInstalledVersion (packagePath, callback) {
  checkIfFile(packagePath, (err) => {
    if (err) return callback(err)
    callback(null, require(packagePath).version)
  })
}

module.exports = getInstalledVersion
