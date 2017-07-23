'use strict'

const fs = require('fs')
const test = require('tape')
const Cattleman = require('../lib/cattleman')

test('Cattleman test cases:', t => {

    t.test('Setup a source directory', assert => {
        fs.mkdirSync('src')
        fs.writeFileSync('src/base.js', 'console.log("base.js")')
        fs.writeFileSync('src/base.css', 'body { background: black; }')

        fs.mkdirSync('src/header')
        fs.writeFileSync('src/header/header.js', 'console.log("header.js")')
        fs.writeFileSync('src/header/header.test.js', 'console.log("header.test.js")')
        fs.writeFileSync('src/header/header.css', 'header { background: red; }')

        fs.mkdirSync('src/footer')
        fs.writeFileSync('src/footer/footer.js', 'console.log("footer.js")')
        fs.writeFileSync('src/footer/footer.test.js', 'console.log("footer.test.js")')
        fs.writeFileSync('src/footer/footer.css', 'footer { background: red; }')

        assert.end()
    })



    t.test('Constructor ...', assert => {
        assert.equal(typeof Cattleman, 'function', '... is function')

        const instance = new Cattleman()
        assert.true(instance instanceof Cattleman, '... is instanceable')
        assert.throws(() => {Cattleman()}, new Error('Cattleman needs to be called with the new keyword'), '... throws error without new keyword')

        assert.end()
    })

    t.test('Method gatherFiles ...', assert => {
        const cattleman = new Cattleman('src')

        assert.true(cattleman.gatherFiles, '... exists')
        assert.equal(typeof cattleman.gatherFiles, 'function', '... is function')

        const list = cattleman.gatherFiles()
        const comparableList = [
            'src/base.css',
            'src/base.js',
            'src/footer/footer.css',
            'src/footer/footer.js',
            'src/header/header.css',
            'src/header/header.js'
        ]
        assert.true(list instanceof Array, '... returns array')
        assert.equal(typeof list[0], 'string', '... returns array of strings')
        assert.deepEqual(list, comparableList, '... works as expected')

        const filteredList = cattleman.gatherFiles('.js')
        const comparableFilteredList = [
            'src/base.js',
            'src/footer/footer.js',
            'src/header/header.js'
        ]
        assert.deepEqual(filteredList, comparableFilteredList, '... works with extentionFilter')
        assert.throws(() => {cattleman.gatherFiles({})}, new Error('extentionFilter has to be type of string'), '... throws error when extentionFilter is no string')
        assert.throws(() => {cattleman.gatherFiles('cattleman')}, new Error('extentionFilter has to start with \'.\''), '... throws error when extentionFilter doesn\'t start with \'.\'')

        assert.end()
    })

    t.test('Method gatherEntries ...', assert => {
        const cattleman = new Cattleman('src')

        assert.true(cattleman.gatherEntries, '... exists')
        assert.equal(typeof cattleman.gatherEntries, 'function', '... is function')

        const entries = cattleman.gatherEntries()
        const comparableEntries = {
            'base' : [ 'src/base.css', 'src/base.js' ],
            'footer/footer' : [ 'src/footer/footer.css', 'src/footer/footer.js' ],
            'header/header' : [ 'src/header/header.css', 'src/header/header.js' ]
        }
        assert.equal(typeof entries, 'object', '... returns object')
        assert.deepEqual(entries, comparableEntries, '... works as expected')

        assert.end()
    })



    t.test('Teardown the source directory', assert => {
        fs.unlinkSync('src/header/header.js')
        fs.unlinkSync('src/header/header.test.js')
        fs.unlinkSync('src/header/header.css')
        fs.rmdirSync('src/header', () => {})

        fs.unlinkSync('src/footer/footer.js')
        fs.unlinkSync('src/footer/footer.test.js')
        fs.unlinkSync('src/footer/footer.css')
        fs.rmdirSync('src/footer', () => {})

        fs.unlinkSync('src/base.js')
        fs.unlinkSync('src/base.css')
        fs.rmdirSync('src', () => {})

        assert.end()
    })

    t.end()
})
