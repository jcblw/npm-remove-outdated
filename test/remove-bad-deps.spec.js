'use strict'

const t = require('tap')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const removeBadDeps = require('../lib/remove-bad-deps')
const randDir = (rand) => path.resolve(process.cwd(), './test/scaffold/packages', rand)
const randDir1 = randDir(`r-${crypto.randomBytes(20).toString('hex')}`)
const randDir2 = randDir(`r-${crypto.randomBytes(20).toString('hex')}`)

// generate some random folders to test
;[randDir1, randDir2].forEach((dir) => {
  fs.mkdirSync(dir)
  t.equal(fs.statSync(dir).isDirectory(), true, 'verify the scaffold files are created')
})

t.equal(typeof removeBadDeps, 'function', 'type exported from module is a function')

t.test('the folder passed in the array will be removed when passing then into the first argument', (test) => {
  removeBadDeps([
    randDir1,
    randDir2
  ], (err) => {
    if (err) {
      test.fail('there should not be an error')
    }
    ;[randDir1, randDir2].forEach((dir) => {
      test.throws(() => { fs.statSync(dir) }, 'ENOENT', 'stat sync throws because there is no file')
    })
    test.end()
  })
})
