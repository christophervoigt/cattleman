const path = require('path')
const test = require('tape')
const Cattleman = require('../lib/cattleman')

test('Cattleman test cases:', t => {

    t.test('Constructor ...', assert => {
        assert.equal(typeof Cattleman, 'function', '... is function')

        const instance = new Cattleman()
        assert.true(instance instanceof Cattleman, '... is instanceable')
        assert.throws(() => {Cattleman()}, new Error('Cattleman needs to be called with the new keyword'), '... throws error without new keyword')

        assert.end()
    })



    t.test('Method gatherFiles ...', assert => {
        const cattleman = new Cattleman('lib')

        assert.true(cattleman.gatherFiles, '... exists')
        assert.equal(typeof cattleman.gatherFiles, 'function', '... is function')

        const list = cattleman.gatherFiles()
        assert.true(list instanceof Array, '... returns array')
        assert.equal(typeof list[0], 'string', '... returns array of strings')

        const filteredList = cattleman.gatherFiles('.js')
        assert.equal(path.extname(list[0]), '.js', '... works with extentionFilter')
        assert.throws(() => {cattleman.gatherFiles({})}, new Error('extentionFilter has to be type of string'), '... throws error when extentionFilter is no string')
        assert.throws(() => {cattleman.gatherFiles('cattleman')}, new Error('extentionFilter has to start with \'.\''), '... throws error when extentionFilter doesn\'t start with \'.\'')

        assert.end()
    })



    t.test('Method gatherEntries ...', assert => {
        const cattleman = new Cattleman('lib')

        assert.true(cattleman.gatherEntries, '... exists')
        assert.equal(typeof cattleman.gatherEntries, 'function', '... is function')

        const entries = cattleman.gatherEntries()
        assert.equal(typeof entries, 'object', '... returns object')

        for(const chunk in entries) {
            assert.true(entries[chunk] instanceof Array, '... returns object of arrays')
            assert.equal(typeof entries[chunk][0], 'string', '... returns object of arrays with strings')
        }

        assert.end()
    })

    t.end()
})
