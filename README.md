# Cattleman

[![Build Status](https://travis-ci.org/chlorophyllkid/cattleman.svg?branch=master)](https://travis-ci.org/chlorophyllkid/cattleman)
[![Coverage Status](https://coveralls.io/repos/github/chlorophyllkid/cattleman/badge.svg?branch=master)](https://coveralls.io/github/chlorophyllkid/cattleman?branch=master)
[![Dependency Status](https://david-dm.org/chlorophyllkid/cattleman.svg)](https://david-dm.org/chlorophyllkid/cattleman)
[![CodeFactor](https://www.codefactor.io/repository/github/chlorophyllkid/cattleman/badge)](https://www.codefactor.io/repository/github/chlorophyllkid/cattleman)

Cattleman is a small helper library. It parses a given directory and gathers javascript and stylesheets of components in entry objects. These objects can be used to extend the webpack config entry property.

## Installation

Install the helper with npm:
```shell
$ npm install cattleman --save-dev
```

## Usage

Require it in your `webpack.config.js` like:

```javascript
const webpack = require('webpack')
const Cattleman = require('cattleman')

let config = {
    entry: {
        base: [ './src/base.js', './src/base.css' ]
    },
    output: {
        filename: 'modules/[name].js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [ ... ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'modules/[name].css',
        })
    ]
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
    directory: 'src',       // search directory
    excludes: [ 'test' ],   // filepaths, which include a string listed here, are ignored
    extentions: {
        stylesheet: '.css', // extention of stylesheets
        script: '.js'       // extention of scripts
    }
}
```
`new Cattleman('src/modules')` is equal to `new Cattleman({ directory: 'src/modules' })`.

## Methods

**gatherEntries()**<br>
Returns an object, where the keys are chunk names and the values are lists of the containing files.

**gatherFiles()**<br>
Returns a list of files in the search directory.

## Example

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
Imagine there are 20 - 30 independent components more.

Instead of writing each of it into the entry property and manage it by yourself, use **gatherEntries()**:
```javascript
const cattleman = new Cattleman('src/modules')

const entries = cattleman.gatherEntries()
// now entries looks like this
{
    'header/header': [
        './src/modules/header/header.js',
        './src/modules/header/header.css'
    ],
    'footer/footer': [
        './src/modules/footer/footer.js',
        './src/modules/footer/footer.css'
    ],
    ...
}
// the chunk names are defined by the filepath of the component

config.entry = Object.assign({}, config.entry, entries)

// since a chunk name is put into the [name] placeholder of the output paths,
// your dist folder will have a clear structure too

module.exports = config
```

If you want to create whole bundles, use **gatherFiles()**:

```javascript
const cattleman = new Cattleman('src/modules')

const files = cattleman.gatherFiles()
// now files looks like this
[
    './src/modules/header/header.js',
    './src/modules/header/header.css',
    './src/modules/footer/footer.js',
    './src/modules/footer/footer.css',
    ...
]

config.entry = { bundle: files }

module.exports = config
```


## License

This project is licensed under [MIT](https://github.com/chlorophyllkid/cattleman/blob/master/LICENSE).
