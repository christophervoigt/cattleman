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


    // @todo: write more tests

    t.test('Method gatherFiles ...', assert => {
        const cattleman = new Cattleman()
        assert.true(cattleman.gatherFiles, '... exists')
        assert.equal(typeof cattleman.gatherFiles, 'function', '... is function')
        assert.end()
    })

    t.test('Method gatherEntries ...', assert => {
        const cattleman = new Cattleman()
        assert.true(cattleman.gatherEntries, '... exists')
        assert.equal(typeof cattleman.gatherEntries, 'function', '... is function')
        assert.end()
    })

    t.test('Method gatherTemplates ...', assert => {
        const cattleman = new Cattleman()
        assert.true(cattleman.gatherTemplates, '... exists')
        assert.equal(typeof cattleman.gatherTemplates, 'function', '... is function')
        assert.end()
    })

    t.end()
})
