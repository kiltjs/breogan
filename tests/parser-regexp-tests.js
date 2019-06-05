/* global describe it */

import {parseRoute}  from '../src/path-parser'
import assert from 'assert'

var specs = {
  'foo': {
    as_string: ['foo'],
    vars: [null],
  },
  '/foo': {
    as_string: ['foo'],
    vars: [null],
  },
  'foo/': {
    as_string: ['foo'],
    vars: [null],
  },
  'foo/bar': {
    as_string: ['foo', 'bar'],
    vars: [null, null],
  },
  '/foo/bar': {
    as_string: ['foo', 'bar'],
    vars: [null, null],
  },
  'foo/bar/': {
    as_string: ['foo', 'bar'],
    vars: [null, null],
  },
  '/foo//bar': {
    as_string: ['foo', '', 'bar'],
    vars: [null, null, null],
  },
  '/foo/:foo/bar': {
    as_string: ['foo', '^(.*?)$', 'bar'],
    vars: [null, ['foo'], null],
  },
  '/foo/id-(:foo)/bar': {
    as_string: ['foo', '^id-(.*?)$', 'bar'],
    vars: [null, ['foo'], null],
  },
  '/foo/id-(:foo)-(:bar)/bar': {
    as_string: ['foo', '^id-(.*?)-(.*?)$', 'bar'],
    vars: [null, ['foo', 'bar'], null],
  },
}

describe('parsePath', function () {

  Object.keys(specs).forEach(function (spec_path) {

    it(spec_path + ' - paths', function  () {
      assert.deepEqual( parseRoute(spec_path).matches.map(function (_match) {
        if( typeof _match === 'string' ) return _match
        return _match.RE.source
      }), specs[spec_path].as_string, 'paths' )

      // assert.deepEqual(
      //   parseRoute(spec_path).matches.map( (_match) => _match.RE.source ),
      //   specs[spec_path].as_string, 'paths'
      // )

    })

    it(spec_path + ' - vars', function  () {
      assert.deepEqual( parseRoute(spec_path).matches.map(function (_match) {
        if( typeof _match === 'string' ) return null
        return _match.vars
      }), specs[spec_path].vars, 'vars' )


      assert.deepEqual(
        parseRoute(spec_path).matches.map( (_match) => _match.vars ),
        specs[spec_path].vars, 'vars'
      )
    })

  })

})
