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

        assert.end()
    })



    t.test('Method gatherEntries ...', assert => {
        const cattleman = new Cattleman('lib')

        assert.true(cattleman.gatherEntries, '... exists')
        assert.equal(typeof cattleman.gatherEntries, 'function', '... is function')

        const entries = cattleman.gatherEntries()
        assert.equal(typeof entries, 'object', '... returns object')

        assert.end()
    })

    t.end()
})
