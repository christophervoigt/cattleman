# Cattleman

[![Build Status](https://travis-ci.org/chlorophyllkid/cattleman.svg?branch=master)](https://travis-ci.org/chlorophyllkid/cattleman)
[![Coverage Status](https://coveralls.io/repos/github/chlorophyllkid/cattleman/badge.svg?branch=master)](https://coveralls.io/github/chlorophyllkid/cattleman?branch=master)
[![CodeFactor](https://www.codefactor.io/repository/github/chlorophyllkid/cattleman/badge)](https://www.codefactor.io/repository/github/chlorophyllkid/cattleman)

Maintainer: Christopher Voigt [@chlorophyllkid](https://twitter.com/chlorophyllkid)

Cattleman is a small helper library that gathers javascript and stylesheet files and combines them to modular bundles.
To archieve that it creates chunks like the `entry` object in the webpack config.

## Installation

Install the helper with npm:
```shell
$ npm install cattleman --save-dev
```

## Usage

Simply require it in your `webpack.config.js` like:

```javascript
const webpack = require('webpack')
const Cattleman = require('cattleman')

let config = {
    entry: { ... },
    output: { ... },
    module: {
        rules: [ ... ]
    },
    plugins: [ ... ]
}

const cattleman = new Cattleman('src/modules')
const entries = cattleman.gatherEntries()

config.entry = Object.assign({}, config.entry, entries)

module.exports = config

```

## Options

You can easily run Cattleman without any options. But have a look at the default settings:
```javascript
defaults = {
    directory: 'src',       // Name of directory cattleman should search in.
    excludes: [],           // Cattleman ignores filepaths which include the strings listed here.
    extentions: {
        stylesheet: '.css', // Extention of stylesheets (set to .scss or .less if needed)
        script: '.js'       // Extention of scripts (set to .ts if needed)
    }
}
```
If you run `new Cattleman('src/modules')`, it would be the same as `new Cattleman({ directory: 'src/modules' })`.

## Methods

Since it's a small helper library, cattleman just got 2 methods.

**gatherFiles()** - Returns a list of all files (except exludes) in the search directory.

**gatherEntries()** - Returns an object, where the keys are chunk names and the values are lists of the containing files.

## Example

Let's say you got a project folder:
```bash
./
build/
src/
package.json
webpack.config.js
```
And in your `src/` folder sits another directory `modules/` containing the code of your site:
```bash
./src/modules
awesomeComponent.js
awesomeComponent.css
fancyModule.js
fancyModule.css
```

You would use cattleman like this:
```javascript
const cattleman = new Cattleman('src/modules')

const files = cattleman.gatherFiles()
// now files looks like this
[
    'src/modules/awesomeComponent.js',
    'src/modules/awesomeComponent.css',
    'src/modules/fancyModule.js',
    'src/modules/fancyModule.css'
]

const entries = cattleman.gatherEntries()
// now entries looks like this
{
    awesomeComponent: [ 'src/modules/awesomeComponent.js', 'src/modules/awesomeComponent.css' ],
    fancyModule: [ 'src/modules/fancyModule.js', 'src/modules/fancyModule.css' ]
}

```

## License

This project is licensed under [MIT](https://github.com/chlorophyllkid/cattleman/blob/master/LICENSE).
