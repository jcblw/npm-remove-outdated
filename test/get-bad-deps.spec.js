'use strict'

const t = require('tap')
const getBadDeps = require('../lib/get-bad-deps')

t.equal(typeof getBadDeps, 'function', 'module.export is a function')
const deps = {'foo': '1.0.0'}
t.equal(Object.keys(getBadDeps(deps, deps, false)).length, 0, 'an empty object is returned if both objects passed are the same')
const currentDeps = {'foo': '0.0.1'}
t.equal(getBadDeps(deps, currentDeps, false).foo, true, 'foo is out of date')
const pkgDeps = {'foo': '~1.0.0', 'bar': '2.1.x'}
const currentPkgDeps = {'foo': '1.0.1', 'bar': '2.0.0'}
t.equal(getBadDeps(pkgDeps, currentPkgDeps, true).foo, false, 'foo is up to date with the pkg')
t.equal(getBadDeps(pkgDeps, currentPkgDeps, true).bar, true, 'bar is out of date with the pkg')
