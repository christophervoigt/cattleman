# Cattleman
[![Build Status](https://travis-ci.org/chlorophyllkid/cattleman.svg?branch=master)](https://travis-ci.org/chlorophyllkid/cattleman)
[![Coverage Status](https://coveralls.io/repos/github/chlorophyllkid/cattleman/badge.svg?branch=master)](https://coveralls.io/github/chlorophyllkid/cattleman?branch=master)
[![Dependency Status](https://david-dm.org/chlorophyllkid/cattleman.svg)](https://david-dm.org/chlorophyllkid/cattleman)
[![CodeFactor](https://www.codefactor.io/repository/github/chlorophyllkid/cattleman/badge)](https://www.codefactor.io/repository/github/chlorophyllkid/cattleman)

Cattleman is a small helper library. It parses a given directory and gathers files and entry objects.
These objects can be used in bundler configurations (e.g. [webpack](https://github.com/webpack/webpack) or [rollup](https://github.com/rollup/rollup)) to extend the entry property.


## Installation
Install it with npm:
```shell
$ npm install cattleman --save-dev
```


## Usage
Require it for example in your `webpack.config.js` like:

```javascript
const Cattleman = require('cattleman')

let config = {
    entry: {
        base: [ 'src/base.js', 'src/base.css' ]
    },
    output: {
        filename: 'modules/[name].js',
        path: __dirname + '/dist'
    },
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
You can init a cattleman instance without options. These are the defaults:
```javascript
defaults = {
    directory:         'src',      // search directory
    excludes:        [ 'test' ],   // filepaths, which include a string listed here, are ignored
    extentions: {
        stylesheet:    '.css',     // extention of stylesheets
        script:        '.js'       // extention of scripts
    }
}
```
If you just pass a string to the constructor, cattleman interprets it as the directory.


## Methods
* **gatherFiles( extentionFilter )** - returns the list of files in the search directory
  <br> *extentionFilter* - (string) filters the list for a specific file type ( e.g. '.js' )

* **gatherEntries()** - returns an object with sorted lists of files (Code Splitting)


## Examples
Let's say you got a `src/` folder in your projects directory containing the code of your site:
```bash
src/
└─ modules/
  ├─ header/
  │ ├─ header.js
  │ └─ header.css
  ├─ footer/
  │ ├─ footer.js
  │ └─ footer.css
  └─ ...
```
Imagine there are 20 - 30 modules more.

If you want to create a bundle from all your files, use **gatherFiles()**:

```javascript
const cattleman = new Cattleman('src/modules')

const files = cattleman.gatherFiles()
// now files whould look like this
[
    'src/modules/header/header.js',
    'src/modules/header/header.css',
    'src/modules/footer/footer.js',
    'src/modules/footer/footer.css',
    ...
]

const jsFiles = cattleman.gatherFiles('.js')
// now jsFiles whould look like this
[
    'src/modules/header/header.js',
    'src/modules/footer/footer.js',
    ...
]

config.entry = {
    bundle: jsFiles
}

module.exports = config
```

If you want separat bundles for each of your modules, use **gatherEntries()**:
```javascript
const cattleman = new Cattleman('src/modules')

const entries = cattleman.gatherEntries()
// now entries whould look like this
{
    'header/header': [
        'src/modules/header/header.js',
        'src/modules/header/header.css'
    ],
    'footer/footer': [
        'src/modules/footer/footer.js',
        'src/modules/footer/footer.css'
    ],
    ...
}

config.entry = Object.assign({}, config.entry, entries)

module.exports = config
```


## License
This library was written by [Christopher Voigt](https://twitter.com/chlorophyllkid) and is licensed under [MIT](https://github.com/chlorophyllkid/cattleman/blob/master/LICENSE).
