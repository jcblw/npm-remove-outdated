## NPM remove outdated

[![Build Status](https://travis-ci.org/jcblw/npm-remove-outdated.svg?branch=master)](https://travis-ci.org/jcblw/npm-remove-outdated)

This is a utility that will remove outdated dependencies from your `node_modules`. The reason why this was built is to allow deploy environments easier ways to cache their packages. Right now if you run `npm install` with a shrink wrap file and you have outdated cached node modules nothing will happen because it assumes the package installed is the correct version of the package. All this script does is check the version of the installed packages against the versions in the shrink-wrap and removes the folder to make `npm install` treat that as a dependency that has not been installed yet.

### Installation

    $ npm install -g npm-remove-outdated

thats it :D

### Usage

    $ npm-remove-outdated && npm install

> Note: that right now this explicitly uses `npm-shrinkwrap.json` files to check dependencies.

### Development

This is a fairly new package and has not been battle tested yet, finding bugs, please contribute back or open an issue.

If you contribute plz run `npm test` before making a PR.
