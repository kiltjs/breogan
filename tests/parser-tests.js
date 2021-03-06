/* global describe it */

import {parsePath} from '../src/path-parser'
import assert from 'assert'

var specs = {
  'foo': {
    head_slash: false,
    tail_slash: false,
    paths: ['foo'],
    length: 1,
  },
  '/foo': {
    head_slash: true,
    tail_slash: false,
    paths: ['foo'],
    length: 1,
  },
  'foo/': {
    head_slash: false,
    tail_slash: true,
    paths: ['foo'],
    length: 1,
  },
  'foo/bar': {
    head_slash: false,
    tail_slash: false,
    paths: ['foo', 'bar'],
    length: 2,
  },
  '/foo/bar': {
    head_slash: true,
    tail_slash: false,
    paths: ['foo', 'bar'],
    length: 2,
  },
  'foo/bar/': {
    head_slash: false,
    tail_slash: true,
    paths: ['foo', 'bar'],
    length: 2,
  },
  '/foo//bar': {
    head_slash: true,
    tail_slash: false,
    paths: ['foo', '', 'bar'],
    length: 3,
  },
  '/foo/:foo/bar': {
    head_slash: true,
    tail_slash: false,
    paths: ['foo', ':foo', 'bar'],
    length: 3,
  },
}

describe('parsePath', function () {

  Object.keys(specs).forEach(function (spec_path) {
    it(spec_path, function  () {
      var result = parsePath(spec_path)

      assert.strictEqual( result.head_slash , specs[spec_path].head_slash , 'head_slash' )
      assert.strictEqual( result.tail_slash , specs[spec_path].tail_slash , 'tail_slash' )
      assert.deepEqual( result.paths, specs[spec_path].paths, 'paths' )
      assert.strictEqual( result.length , specs[spec_path].length , 'length' )
    })
  })

})
