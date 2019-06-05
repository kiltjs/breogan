
export function parsePath (path) {
  var result = { head_slash: false, tail_slash: false }

  if( typeof path !== 'string' ) throw new TypeError('path should be a String, received: ' + typeof path)

  result.paths = path.replace(/^\//, function () {
    result.head_slash = true
    return ''
  }).replace(/\/$/, function () {
    result.tail_slash = true
    return ''
  }).split('/')

  result.length = result.paths.length

  return result
}

export function pathMatches (path_result) {
  return path_result.paths.map(function (slug) {
    if( /^:/.test(slug) ) return {
      RE: /^(.*?)$/,
      vars: [slug.substr(1)],
    }

    if( /\(:.+?\)/.test(slug) ) return (function (slug) {
      var vars = [],
          RE_parts = slug.split(/(\(:\w+?\))/g).map(function (re_part, i) {
            if( i%2 ) {
              vars.push( re_part.substr(2, re_part.length - 3) )
              // return '([a-zA-Z][a-zA-Z0-9_]*?)';
              return '(.*?)'
            } else return re_part
          })

      return { vars: vars, RE: new RegExp('^' + RE_parts.join('') + '$') }

    })(slug)

    return slug
    // return {
    //   RE: new RegExp('^' + slug + '$'),
    //   vars: null,
    // }
  })
}

export function parseRoute (path) {
  var result = parsePath(path)

  result.matches = pathMatches(result)

  return result
}

export function extractParams (matches, paths) {
  var params = {}

  matches.forEach(function (_match, i) {
    if( typeof _match === 'string' ) return

    var _matched = paths[i].match(_match.RE)

    if( !_matched ) throw new Error(
      '\'' + paths.join('/') +
      '\' does not match \'' +
      matches.map(function (part) {
        return typeof part === 'string' ? part : part.RE.source
      }).join('/')
    )

    ;(_match.vars || []).forEach(function (var_name, i) {
      params[var_name] = _matched[i + 1]
    })
  })

  return params
}
