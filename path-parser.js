
function parsePath (path) {
  var result = { head_slash: false, tail_slash: false };

  if( typeof path !== 'string' ) throw new TypeError('path should be a String, received: ' + typeof path);

  result.paths = path.replace(/^\//, function () {
    result.head_slash = true;
    return '';
  }).replace(/\/$/, function () {
    result.tail_slash = true;
    return '';
  }).split('/');

  result.levels = result.paths.length;

  return result;
}

module.exports = parsePath;
