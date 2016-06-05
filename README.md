## NPM remove outdated

[![Build Status](https://travis-ci.org/jcblw/npm-remove-outdated.svg?branch=master)](https://travis-ci.org/jcblw/npm-remove-outdated) [![Coverage Status](https://coveralls.io/repos/github/jcblw/npm-remove-outdated/badge.svg?branch=master)](https://coveralls.io/github/jcblw/npm-remove-outdated?branch=master)

This is a utility that will remove outdated dependencies from your `node_modules`. The reason why this was built is to allow deploy environments easier ways to cache their packages. Right now if you run `npm install` with a shrink wrap file and you have outdated cached node modules nothing will happen because it assumes the package installed is the correct version of the package. All this script does is check the version of the installed packages against the versions in the shrink-wrap and removes the folder to make `npm install` treat that as a dependency that has not been installed yet.

### Installation

    $ npm install -g npm-remove-outdated

thats it :D

### Usage

    $ npm-remove-outdated && npm install

This package can work with either a `npm-shrinkwrap.json` file or a  `package.json` file. When using *shrinkwrap* the version check is an explicit `===` to the version in the package file. When no *shrinkwrap* is found the *package.json* is used. Then the version checking is based off of [semver](https://www.npmjs.com/package/semver)'s satisfies method.

### Development

    npm i
    npm test

If you contribute plz run `npm test` before making a PR.
