'use strict'

const path = require('path')
const fs = require('fs')

const defaults = {
    directory: 'src',
    excludes: [ 'test' ]
}

const getFiles = (directory, excludes) => {
    let files = []

    const folders = fs.readdirSync(directory)

    folders.forEach(folder => {
        const filePath = path.join(directory, folder)
        const stat = fs.statSync(filePath)

        if (stat && stat.isDirectory()) {
            files = files.concat(getFiles(filePath, excludes))
        } else {
            let keep = true

            excludes.forEach(str => {
                if (filePath.includes(str)) { keep = false }
            })

            if (keep) { files.push(filePath) }
        }
    })

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

    if (options) {
        if (!(typeof options === 'string' || typeof options === 'object') ) {
            throw new Error('options has to be string or object')
        }

        if (typeof options === 'string') {
            options = {
                directory: options
            }
        }

        this.options = Object.assign({}, defaults, options)
    } else {
        this.options = defaults
    }
}

/**
 * Parses project directory and creates a list of valid files.
 * @param {(string|array)} [extentionFilter] - File extention of interest.
 * @returns {array} - List of valid files
 */
Cattleman.prototype.gatherFiles = function (extentionFilter) {
    let files = getFiles(this.options.directory, this.options.excludes)

    if (extentionFilter) {
        if (!(typeof extentionFilter === 'string' || extentionFilter instanceof Array) ) {
            throw new Error('extentionFilter has to be string or array of strings')
        }

        if (typeof extentionFilter === 'string') {
            extentionFilter = [ extentionFilter ]
        }

        files = files.filter(file => {
            const ext = path.extname(file)
            let valid = false

            extentionFilter.forEach(extention => {
                if (!(typeof extention === 'string')) {
                    throw new Error('every filter has to be type of string')
                }
                if (!extention.startsWith('.')) {
                    throw new Error('every filter has to start with \'.\'')
                }

                if (ext === extention) { valid = true }
            })

            return valid
        })
    }

    return files
}

/**
 * Parses project directory and creates an object of entry points. Object keys are the module chunk names.
 * @param {(string|array)} [extentionFilter] - File extention of interest.
 * @returns {object} - Object of entry points.
 */
Cattleman.prototype.gatherEntries = function (extentionFilter) {
    let files = this.gatherFiles(extentionFilter)

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

module.exports = Cattleman
