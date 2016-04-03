'use strict'

const t = require('tap')
const getBadDeps = require('../lib/get-bad-deps')

t.equal(typeof getBadDeps, 'function', 'module.export is a function')
const deps = {'foo': '1.0.0'}
t.equal(Object.keys(getBadDeps(deps, deps)).length, 0, 'an empty object is returned if both objects passed are the same')
const currentDeps = {'foo': '0.0.1'}
t.equal(getBadDeps(deps, currentDeps).foo, true, 'foo is out of date')
