
var parsePath = require('../path-parser'),
    assert = require('assert');

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
};

describe('parsePath', function () {

  Object.keys(specs).forEach(function (spec_path) {

    it(spec_path, function  () {
      assert.deepEqual( parsePath(spec_path).matches.map(function (_match) {
        if( typeof _match === 'string' ) return _match;
        return _match.RE.source
      }), specs[spec_path].as_string, 'paths' );
    });

    it(spec_path + ' - vars', function  () {
      assert.deepEqual( parsePath(spec_path).matches.map(function (_match) {
        if( typeof _match === 'string' ) return null;
        return _match.vars;
      }), specs[spec_path].vars, 'vars' );
    });

  });

});
