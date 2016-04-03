'use strict'

const t = require('tap')
const getDeps = require('../lib/get-deps')
const path = require('path')

t.equal(typeof getDeps, 'function', 'type exported from module is a function')
t.throws(() => { getDeps() }, 'if no path is used a exception is thrown')

t.test('get deps callback error if no file is found', (test) => {
  getDeps('./test/scaffold/foo', (err) => {
    test.equal(typeof err, 'object', 'the error from the callback is an object')
    test.match(err.message, 'ENOENT', 'the error message is a file not found message')
    test.end()
  })
})

t.test('get deps callback error if the file given is not formatted properly', (test) => {
  getDeps(path.resolve(process.cwd(), './test/scaffold/shrinkwrap-bad.json'), (err) => {
    test.equal(typeof err, 'object', 'the error from the callback is an object')
    test.match(err.message, 'current shrink-wrap file is not formatted correctly', 'the error message is a file not formatted properly')
    test.end()
  })
})

t.test('get deps callback will return an object with the key value of some dependencies from the shrinkwrap file if file is found', (test) => {
  getDeps(path.resolve(process.cwd(), './test/scaffold/shrinkwrap-mock.json'), (err, deps) => {
    if (err) test.fail('no error should be present')
    test.equal(typeof deps, 'object', 'the deps in second argument of the callback is an object')
    test.equal(deps.hasOwnProperty('foo'), true, 'the key foo is set')
    test.equal(deps.hasOwnProperty('bar'), true, 'the key bar is set')
    test.equal(deps.foo, '1.0.0', 'the foo deps has the correct version')
    test.equal(deps.bar, '2.0.0', 'the bar deps has the correct version')
    test.end()
  })
})
