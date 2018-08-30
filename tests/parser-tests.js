
var parsePath = require('../path-parser'),
    assert = require('assert');

var specs = {
  'foo': {
    head_slash: false,
    tail_slash: false,
    paths: ['foo'],
    levels: 1,
  },
  '/foo': {
    head_slash: true,
    tail_slash: false,
    paths: ['foo'],
    levels: 1,
  },
  'foo/': {
    head_slash: false,
    tail_slash: true,
    paths: ['foo'],
    levels: 1,
  },
  'foo/bar': {
    head_slash: false,
    tail_slash: false,
    paths: ['foo', 'bar'],
    levels: 2,
  },
  '/foo/bar': {
    head_slash: true,
    tail_slash: false,
    paths: ['foo', 'bar'],
    levels: 2,
  },
  'foo/bar/': {
    head_slash: false,
    tail_slash: true,
    paths: ['foo', 'bar'],
    levels: 2,
  },
  '/foo//bar': {
    head_slash: true,
    tail_slash: false,
    paths: ['foo', '', 'bar'],
    levels: 3,
  },
  '/foo/:foo/bar': {
    head_slash: true,
    tail_slash: false,
    paths: ['foo', ':foo', 'bar'],
    levels: 3,
  },
};

describe('parsePath', function () {

  Object.keys(specs).forEach(function (spec_path) {
    it(spec_path, function  () {
      assert.deepEqual( parsePath(spec_path), specs[spec_path], spec_path );
    });
  });

});

var throw_types = {
  'null': null,
  'Array': [],
  'plain Object': {},
  'Number': 123456,
};

describe('parsePath: throws', function () {

  for( var throw_type in throw_types ) {
    it('TypeError', function  () {

      assert.throws(function () {
        parsePath(throw_types[throw_type])
      }, TypeError, throw_type);

    });
  }

  for( var throw_type in throw_types ) {
    it('message', function  () {

      assert.throws(function () {
        parsePath(throw_types[throw_type])
      }, /path should be a String/, throw_type);

    });
  }

});
