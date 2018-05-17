'use strict'

const fs = require('fs')
const path = require('path')
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

        const firstInstance = new Cattleman()
        assert.true(firstInstance instanceof Cattleman, '... is instanceable')

        const secondInstance = new Cattleman('src')
        assert.true(secondInstance instanceof Cattleman, '... is instanceable with string')

        const thirdInstance = new Cattleman({ directory:  'src' })
        assert.true(thirdInstance instanceof Cattleman, '... is instanceable with object')

        assert.throws(() => {Cattleman()},
            new Error(),
            '... throws error if called without new keyword')

        assert.throws(() => {new Cattleman([ 1, 2, 3 ])},
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
            path.join('src', path.sep ,'base.css'),
            path.join('src', path.sep ,'base.js'),
            path.join('src', path.sep ,'footer', path.sep ,'footer.css'),
            path.join('src', path.sep ,'footer', path.sep ,'footer.html'),
            path.join('src', path.sep ,'footer', path.sep ,'footer.js'),
            path.join('src', path.sep ,'header', path.sep ,'header.css'),
            path.join('src', path.sep ,'header', path.sep ,'header.html'),
            path.join('src', path.sep ,'header', path.sep ,'header.js')
        ]
        assert.true(allFiles instanceof Array, '... returns array')
        assert.deepEqual(allFiles, comparableList, '... works as expected')

        const allScriptFiles = cattleman.gatherFiles('.js')
        const comparableScriptList = [
            path.join('src', path.sep ,'base.js'),
            path.join('src', path.sep ,'footer', path.sep ,'footer.js'),
            path.join('src', path.sep ,'header', path.sep ,'header.js')
        ]
        assert.deepEqual(allScriptFiles, comparableScriptList, '... works with extentionFilter string')

        const allScriptAndStyleFiles = cattleman.gatherFiles(['.js', '.css'])
        const comparableScriptAndStyleList = [
            path.join('src', path.sep ,'base.css'),
            path.join('src', path.sep ,'base.js'),
            path.join('src', path.sep ,'footer', path.sep ,'footer.css'),
            path.join('src', path.sep ,'footer', path.sep ,'footer.js'),
            path.join('src', path.sep ,'header', path.sep ,'header.css'),
            path.join('src', path.sep ,'header', path.sep ,'header.js')
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
