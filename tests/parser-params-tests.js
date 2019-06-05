/* global describe it */

import assert from 'assert'
import { extractParams, parseRoute } from '../src/path-parser'

describe('extractParams', function () {

  function _runTestCase (matches, path, params) {

    it(`${ matches.map( _match => typeof _match === 'string' ? _match : _match.RE.source ).join('/') } -> {${ Object.keys(params).join(',') }}`, function () {

      assert.deepEqual(
        extractParams(matches, path.split('/') ),
        params
      )

    })

  }

  [
    [
      ['foo', { RE: /^(.*?)$/, vars: ['foo'] }],
      'foo/s987st978s9s',
      {
        foo: 's987st978s9s',
      }
    ],
    [
      parseRoute('foo/:foo/parsed').matches,
      'foo/s987st978s9s',
      {
        foo: 's987st978s9s',
      }
    ],
  ].forEach( (test_case) => _runTestCase.apply(null, test_case) )

})
