Cattleman
=========
[![Build Status](https://travis-ci.org/chlorophyllkid/cattleman.svg?branch=master)](https://travis-ci.org/chlorophyllkid/cattleman)
[![Coverage Status](https://coveralls.io/repos/github/chlorophyllkid/cattleman/badge.svg?branch=master)](https://coveralls.io/github/chlorophyllkid/cattleman?branch=master)
[![CodeFactor](https://www.codefactor.io/repository/github/chlorophyllkid/cattleman/badge)](https://www.codefactor.io/repository/github/chlorophyllkid/cattleman)

Maintainer: Christopher Voigt [@chlorophyllkid](https://twitter.com/chlorophyllkid)

Cattleman is a small helper library that gathers javascript and stylesheet files and combines them to modular bundles.
To archieve that it creates chunks like the `entry` object in the webpack config.

Installation
------------
Install the helper with npm:
```shell
$ npm install cattleman --save-dev
```

Usage
-----
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

Options
-------
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

License
-------
This project is licensed under [MIT](https://github.com/chlorophyllkid/cattleman/blob/master/LICENSE).
