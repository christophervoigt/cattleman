'use strict'

const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const defaultOptions = {
    commonChunks: [],
    directory: path.join(__dirname, 'src'),
    excludes: [],
    extentions: {
        template: '.html',
        stylesheet: '.css',
        script: '.js'
    },
    filename: '[name].html'
}

const getFiles = (directory, excludes) => {
    let files = []

    const folder = fs.readdirSync(directory)

    for (let i = 0; i < folder.length; i++) {
        const filePath = path.join(directory, folder[i])
        const stat = fs.statSync(filePath)

        if (stat && stat.isDirectory()) {
            files = files.concat(getFiles(filePath))
        } else {
            let keep = true

            excludes.forEach(str => {
                if (filePath.includes(str)) { keep = false }
            })

            if (keep) { files.push(filePath) }
        }
    }

    return files
}

/**
 * Represents a cattleman, who gathers from the modular project directory.
 * @constructor
 * @param {object} options - (optional) Object to override default options.
 */
function Cattleman(options) {
    'use strict'

    if (!(this instanceof Cattleman)) {
        throw new Error('Cattleman needs to be called with the new keyword')
    }

    this.options = Object.assign(defaultOptions, options)
}

/**
 * Parses project directory and creates a list of valid files.
 * @returns {array} - List of valid files
 */
Cattleman.prototype.gatherFiles = function () {
    const files = getFiles(this.options.directory, this.options.excludes)
    return files
}

/**
 * Parses project directory and creates entry object of scripts and stylesheets arrays.
 * Object keys are the module chunk names.
 * @returns {object} - Entry object
 */
Cattleman.prototype.gatherEntries = function () {
    let files = getFiles(this.options.directory, this.options.excludes)

    files = files.filter(file => {
        const ext = path.extname(file)
        return (ext === this.options.extentions.script || ext === this.options.extentions.stylesheet)
    })


    const entries = {}

    files.forEach(file => {
        const filename = file.replace(this.options.directory, '')
        const chunkName = filename.substr(1, filename.indexOf('.') - 1)

        if (!entries[chunkName]) {
            entries[chunkName] = []
        }

        entries[chunkName].push(file)
    })

    return entries
}

/**
 * Parses project directory and creates a list of templates as HtmlWebpackPlugin.
 * @returns {array} - List of HtmlWebPlugins
 */
Cattleman.prototype.gatherTemplates = function () {
    let files = getFiles(this.options.directory, this.options.excludes)

    files = files.filter(file => {
        const ext = path.extname(file)
        return (ext === this.options.extentions.template || ext === '.json')
    })


    const options = {}

    files.forEach(file => {
        const filename = file.replace(this.options.directory, '')
        const chunkName = filename.substr(1, filename.indexOf('.') - 1)

        if (!options[chunkName]) {
            const chunks = this.options.commonChunks
            chunks.push(chunkName)

            options[chunkName] = {
                chunks: chunks,
                filename: this.options.filename.replace('[name]', chunkName)
            }
        }

        const ext = path.extname(filename)
        if (ext === this.options.extentions.template) {
            options[chunkName].template = file
        }
        if (ext === '.json') {
            options[chunkName].dataFile = file
        }
    })


    const templates = []

    for (const key in options) {
        if (options[key]) {
            if (options[key].dataFile) {
                const data = JSON.parse(fs.readFileSync(options[key].dataFile))
                options[key] = Object.assign({}, options[key], {data})
            }

            templates.push(new HtmlWebpackPlugin(options[key]))
        }
    }

    return templates
}

module.exports = Cattleman
