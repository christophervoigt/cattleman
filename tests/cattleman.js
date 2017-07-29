'use strict'

const fs = require('fs')
const test = require('tape')
const Cattleman = require('../lib/cattleman')

test('Cattleman test cases:', t => {

    t.test('Setup a source directory', assert => {
        fs.mkdirSync('src')
        fs.writeFileSync('src/base.css', 'body { background: black; }')
        fs.writeFileSync('src/base.js', 'console.log("base.js")')

        fs.mkdirSync('src/header')
        fs.writeFileSync('src/header/header.css', 'header { background: red; }')
        fs.writeFileSync('src/header/header.html', '<header></header>')
        fs.writeFileSync('src/header/header.js', 'console.log("header.js")')
        fs.writeFileSync('src/header/header.test.js', 'console.log("header.test.js")')

        fs.mkdirSync('src/footer')
        fs.writeFileSync('src/footer/footer.css', 'footer { background: red; }')
        fs.writeFileSync('src/footer/footer.html', '<footer></footer>')
        fs.writeFileSync('src/footer/footer.js', 'console.log("footer.js")')
        fs.writeFileSync('src/footer/footer.test.js', 'console.log("footer.test.js")')

        assert.end()
    })



    t.test('Constructor ...', assert => {
        assert.equal(typeof Cattleman, 'function', '... is function')

        const instance = new Cattleman()
        assert.true(instance instanceof Cattleman, '... is instanceable')

        assert.throws(() => {Cattleman()},
            new Error(),
            '... throws error if called without new keyword')

        assert.throws(() => {Cattleman(['src'])},
            new Error(),
            '... throws error if options is neither string nor object')

        assert.end()
    })

    t.test('Method gatherFiles ...', assert => {
        const cattleman = new Cattleman('src')

        assert.true(cattleman.gatherFiles, '... exists')
        assert.equal(typeof cattleman.gatherFiles, 'function', '... is function')

        const allFiles = cattleman.gatherFiles()
        const comparableList = [
            'src/base.css',
            'src/base.js',
            'src/footer/footer.css',
            'src/footer/footer.html',
            'src/footer/footer.js',
            'src/header/header.css',
            'src/header/header.html',
            'src/header/header.js'
        ]
        assert.true(allFiles instanceof Array, '... returns array')
        assert.deepEqual(allFiles, comparableList, '... works as expected')

        const allScriptFiles = cattleman.gatherFiles('.js')
        const comparableScriptList = [
            'src/base.js',
            'src/footer/footer.js',
            'src/header/header.js'
        ]
        assert.deepEqual(allScriptFiles, comparableScriptList, '... works with extentionFilter string')

        const allScriptAndStyleFiles = cattleman.gatherFiles(['.js', '.css'])
        const comparableScriptAndStyleList = [
            'src/base.css',
            'src/base.js',
            'src/footer/footer.css',
            'src/footer/footer.js',
            'src/header/header.css',
            'src/header/header.js'
        ]
        assert.deepEqual(allScriptAndStyleFiles, comparableScriptAndStyleList, '... works with extentionFilter array')

        const noFiles = cattleman.gatherFiles([])
        assert.deepEqual(noFiles, [], '... works with empty extentionFilter')

        assert.throws(() => { cattleman.gatherFiles({test:'object'}) },
            new Error(),
            '... throws error if extentionFilter is neither string nor array')

        assert.throws(() => {cattleman.gatherFiles([ 5, 6, 7 ])},
            new Error(),
            '... throws error if one extentionFilter is not type of string')

        assert.throws(() => {cattleman.gatherFiles('js')},
            new Error(),
            '... throws error if one extentionFilter does not start with \'.\'')

        assert.end()
    })

    t.test('Method gatherEntries ...', assert => {
        const cattleman = new Cattleman('src')

        assert.true(cattleman.gatherEntries, '... exists')
        assert.equal(typeof cattleman.gatherEntries, 'function', '... is function')

        const entries = cattleman.gatherEntries()
        const comparableEntries = {
            'base' : [ 'src/base.css', 'src/base.js' ],
            'footer/footer' : [ 'src/footer/footer.css', 'src/footer/footer.html', 'src/footer/footer.js' ],
            'header/header' : [ 'src/header/header.css', 'src/header/header.html', 'src/header/header.js' ]
        }
        assert.equal(typeof entries, 'object', '... returns object')
        assert.deepEqual(entries, comparableEntries, '... works as expected')

        const allScriptEntries = cattleman.gatherEntries('.js')
        const comparableScriptEntries = {
            'base' : [ 'src/base.js' ],
            'footer/footer' : [ 'src/footer/footer.js' ],
            'header/header' : [ 'src/header/header.js' ]
        }
        assert.deepEqual(allScriptEntries, comparableScriptEntries, '... works with extentionFilter string')

        const allScriptAndStyleEntries = cattleman.gatherEntries(['.js', '.css'])
        const comparableScriptAndStyleEntries = {
            'base' : [ 'src/base.css', 'src/base.js' ],
            'footer/footer' : [ 'src/footer/footer.css', 'src/footer/footer.js' ],
            'header/header' : [ 'src/header/header.css', 'src/header/header.js' ]
        }
        assert.deepEqual(allScriptAndStyleEntries, comparableScriptAndStyleEntries, '... works with extentionFilter array')

        const noEntries = cattleman.gatherEntries([])
        assert.deepEqual(noEntries, {}, '... works with empty extentionFilter')

        assert.throws(() => { cattleman.gatherEntries({test:'object'}) },
            new Error(),
            '... throws error if extentionFilter is neither string nor array')

        assert.throws(() => {cattleman.gatherEntries([ 5, 6, 7 ])},
            new Error(),
            '... throws error if one extentionFilter is not type of string')

        assert.throws(() => {cattleman.gatherEntries('js')},
            new Error(),
            '... throws error if one extentionFilter does not start with \'.\'')

        assert.end()
    })



    t.test('Teardown the source directory', assert => {
        fs.unlinkSync('src/header/header.css')
        fs.unlinkSync('src/header/header.html')
        fs.unlinkSync('src/header/header.js')
        fs.unlinkSync('src/header/header.test.js')
        fs.rmdirSync('src/header', () => {})

        fs.unlinkSync('src/footer/footer.css')
        fs.unlinkSync('src/footer/footer.html')
        fs.unlinkSync('src/footer/footer.js')
        fs.unlinkSync('src/footer/footer.test.js')
        fs.rmdirSync('src/footer', () => {})

        fs.unlinkSync('src/base.js')
        fs.unlinkSync('src/base.css')
        fs.rmdirSync('src', () => {})

        assert.end()
    })

    t.end()
})
