
import {parseRoute, parsePath, extractParams} from './path-parser'

// Array like AST: https://github.com/kiltjs/breogan/commit/7ae446747e5c8896c829fd3d964a59b754df1f92

export function _addRoute (ast, matches, route_params, listenerFn) {

  var _match = matches.shift(),
      is_last_match = !matches.length

  var slug = typeof _match === 'string' ? _match : _match.RE.source

  if( ast[slug] ) {
    ast[slug].listeners.push({
      run: listenerFn, route_params,
    })
  } else ast[slug] = {
    _: is_last_match ? {} : _addRoute({}, matches, route_params, listenerFn),
    listeners: is_last_match ? [{ run: listenerFn, route_params }] : [],
    test: typeof _match === 'string'
      ? function (value) { return value === _match }
      : _match.RE.test.bind(_match.RE),
  }

  return ast
}

export function addRoute (ast, route_path, listenerFn) {
  var parsed_route = parseRoute(route_path)

  if( !ast || typeof ast !== 'object' || ast instanceof Array ) throw new TypeError('AST should be a plain Object')

  return _addRoute(ast, parsed_route.matches.slice(), parsed_route, listenerFn)
}

export function _processRoute (ast, slugs, parsed_route) {
  var _slug = slugs.shift()

  if( !ast[_slug] ) return false

  if( slugs.length ) return _processRoute(ast[_slug]._, slugs, parsed_route)

  ast[_slug].listeners.forEach(function (listener) {
    listener.run( extractParams(listener.route_params.matches, parsed_route.paths) )
  })

  return true
}

export function processRoute (paths, route_path) {
  var parsed_route = parsePath(route_path)

  return _processRoute(paths, parsed_route.paths.slice(), parsed_route )
}
