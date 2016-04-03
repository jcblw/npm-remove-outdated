'use strict'

const fs = require('fs')

function checkIfFile (filePath, callback) {
  fs.stat(filePath, (err, stat) => {
    if (err) {
      return callback(err)
    }
    if (!stat.isFile()) {
      return callback(new Error(`${filePath} is not a file`))
    }
    callback(null)
  })
}

module.exports = checkIfFile
