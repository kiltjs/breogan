
var parsePath = require('../path-parser'),
    assert = require('assert');

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
