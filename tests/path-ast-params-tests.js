/* global describe it */

import {addRoute, processRoute} from '../src/path-ast'
import assert from 'assert'

describe('path-ast: processRoute', function () {

  function _runTestCase (route_path, path, expected_params) {

    it( route_path + ', ' + path, function () {

      var paths = [],
          is_processed = false
      
      addRoute(paths, route_path, function (params) {
        assert.deepEqual(params, expected_params)
        is_processed = true
      })

      assert.strictEqual( processRoute(paths, path), true )
      assert.strictEqual( is_processed, true )
    })

  }

  [
    // [':foo', 'foo/98a7t9a87ta', { foo: '98a7t9a87ta' }],
    ['foo/:bar', 'foo/98a7t9a87ta', { bar: '98a7t9a87ta' }],
    ['foo/(:foo)-(:bar)', 'foo/98a7t9a87ta-a987ta987at', { foo: '98a7t9a87ta', bar: 'a987ta987at' }],
  ].forEach( (test_case) => _runTestCase.apply(null, test_case) )

})
