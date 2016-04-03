'use strict'

const t = require('tap')
const path = require('path')
const getCurrentDepVersions = require('../lib/get-current-dep-versions')
const testPackagePath = path.resolve(process.cwd(), './test/scaffold/packages/')

t.equal(typeof getCurrentDepVersions, 'function', 'type exported from module is a function')

t.test('the error from the callback if file is not found', (test) => {
  getCurrentDepVersions({bar: true}, testPackagePath, (err) => {
    test.equal(typeof err, 'object', 'the error from the callback is an object')
    test.equal(typeof err.bar, 'object', 'the error object has a key bar and that is an error object')
    test.match(err.bar.message, 'ENOENT', 'the error message is a file not found message')
    test.end()
  })
})

t.test('the deps object in the second argument to the callback', (test) => {
  getCurrentDepVersions({foo: true, baz: true}, testPackagePath, (err, deps) => {
    if (err) test.fail('there should not be an error')
    test.equal(typeof deps, 'object', 'the deps variable is an object')
    test.equal(typeof deps.foo, 'string', 'the value of the key foo in the deps object is a string')
    test.equal(typeof deps.baz, 'string', 'the value of the key baz in the deps object is a string')
    test.equal(deps.foo, '1.0.0', 'the value foo is the correct version')
    test.equal(deps.baz, '3.0.0', 'the value baz is the correct version')
    test.end()
  })
})
