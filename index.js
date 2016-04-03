#!/usr/bin/env node

'use strict'

const path = require('path')
const getDeps = require('./lib/get-deps')
const getCurrentDepVersions = require('./lib/get-current-dep-versions')
const getBadDeps = require('./lib/get-bad-deps')
const removeBadDeps = require('./lib/remove-bad-deps')
const shrinkwrapPath = path.resolve(process.cwd(), './npm-shrinkwrap.json')
const packagesPath = path.resolve(process.cwd(), './node_modules/')

getDeps(shrinkwrapPath, (err, deps) => {
  if (err) throw err
  getCurrentDepVersions(deps, packagesPath, (err, currDeps) => {
    if (err) throw err
    const baddies = getBadDeps(deps, currDeps)
    if (Object.keys(baddies).length) {
      console.log(`cleaning out of date deps: ${Object.keys(baddies).join(',')}`)
      const folders = Object.keys(baddies).map((dep) => path.resolve(packagesPath, `./${dep}/`))
      return removeBadDeps(folders, (err) => {
        if (err) throw err
        console.log('modules successfully removed')
      })
    }
    console.log('all deps up to date')
  })
})
