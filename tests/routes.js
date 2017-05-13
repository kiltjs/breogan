
var Router = require('../breogan'),
    assert = require('assert');

var router = new Router;

describe('Router', function () {

  it('.path', function  () {

    var ids = [];

    router.route('/foo/:fooId', function (id) {
      ids.push(id);
    });

    router.run('/foo/foo');
    router.run('/foo/bar');

    try{
      router.run('/foo/bar/excluded');
    } catch(err) {
      assert.strictEqual( err.route, '/foo/bar/excluded' );
      assert.strictEqual( err.missing, true );
    }

    assert.strictEqual( ids.join(', '), 'foo, bar' );

  });

});
