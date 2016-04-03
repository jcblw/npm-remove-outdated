'use strict'

const t = require('tap')
const checkIfFile = require('../lib/check-if-file')

t.equal(typeof checkIfFile, 'function', 'module.export is a function')
t.throws(() => { checkIfFile() }, 'you need to pass a path as first param')

t.test('the checkIfFile callback error for no file', (test) => {
  checkIfFile('./foo', (err) => {
    test.equal(typeof err, 'object', 'error object is passed to first param of callback if bad path is given')
    test.match(err.message, /ENOENT/, 'error is a file no found error')
    test.end()
  })
})

t.test('the checkIfFile callback error for a none file', (test) => {
  checkIfFile('./test', (err) => {
    test.equal(typeof err, 'object', 'error object is passed to first param of callback if bad path is given')
    test.match(err.message, './test is not a file', 'error is a not a file error')
    test.end()
  })
})

t.test('the checkIfFile callback for a file', (test) => {
  checkIfFile('./test/check-if-file.spec.js', (err) => {
    test.equal(!!err, false, 'a falsy value is passed back to callback if path paoints at a file')
    test.end()
  })
})
