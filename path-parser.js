
function parsePath (path) {
  console.log('parsePath', path);
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

  result.matches = result.paths.map(function (slug) {
    if( /^:/.test(slug) ) return {
      RE: /^(.*?)$/,
      vars: [slug.substr(1)],
    };

    if( /\(:.+?\)/.test(slug) ) return (function (slug) {
      var vars = [],
          RE_parts = slug.split(/(\(:\w+?\))/g).map(function (re_part, i) {
            if( i%2 ) {
              vars.push( re_part.substr(2, re_part.length - 3) );
              // return '([a-zA-Z][a-zA-Z0-9_]*?)';
              return '(.*?)';
            } else return re_part;
          });

      return { vars: vars, RE: new RegExp('^' + RE_parts.join('') + '$') };

    })(slug);

    return slug;
  });

  return result;
}

module.exports = parsePath;
