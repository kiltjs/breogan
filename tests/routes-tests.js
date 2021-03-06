/* global describe it */

import Router from '../src/breogan'
import assert from 'assert'

var router = new Router

describe('Router', function () {

  it('.path', function  () {

    var ids = []

    router.route('/foo/:foo_id', function (params) {
      ids.push(params.foo_id)
    })

    router.run('/foo/foo')
    router.run('/foo/bar')

    try{
      router.run('/foo/bar/excluded')
    } catch(err) {
      assert.strictEqual( err.route, '/foo/bar/excluded' )
      assert.strictEqual( err.missing, true )
    }

    assert.strictEqual( ids.join(', '), 'foo, bar' )

  })

})
