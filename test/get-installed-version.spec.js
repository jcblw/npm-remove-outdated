'use strict'

const t = require('tap')
const path = require('path')
const getInstalledVersion = require('../lib/get-installed-version')

t.equal(typeof getInstalledVersion, 'function', 'type exported from module is a function')

t.test('the error from the callback if file is not found', (test) => {
  getInstalledVersion(path.resolve(process.cwd(), './test/scaffold/packages/bar/package.json'), (err) => {
    test.equal(typeof err, 'object', 'the error from the callback is an object')
    test.match(err.message, 'ENOENT', 'the error message is a file not found message')
    test.end()
  })
})

t.test('the second argument of the callback function', (test) => {
  getInstalledVersion(path.resolve(process.cwd(), './test/scaffold/packages/foo/package.json'), (err, version) => {
    if (err) test.fail('there should not be an error')
    test.equal(typeof version, 'string', 'the second argument of the callback should be a string')
    test.equal(version, '1.0.0', 'the correct version of the dep should be returned')
    test.end()
  })
})
