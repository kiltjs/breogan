
import {parseRoute, parsePath, extractParams} from './path-parser'

export function _addRoute (ast, matches, route_params, listenerFn) {

  var _match = matches.shift(),
      is_last_match = !matches.length

  var slug = typeof _match === 'string' ? _match : _match.RE.source

  var _matched_slug = ast.some(function (_entry) {
    if( slug !== _entry.slug ) return

    if( is_last_match ) {
      _entry.listeners.push({
        run: listenerFn, route_params,
      })
    } else _addRoute(_entry._, matches, route_params, listenerFn)

    return true
  })

  if( !_matched_slug ) ast.push({
    slug: slug,
    _: is_last_match ? [] : _addRoute([], matches, route_params, listenerFn),
    listeners: is_last_match ? [{ run: listenerFn, route_params }] : [],
    test: typeof _match === 'string'
      ? function (value) { return value === _match }
      : _match.RE.test.bind(_match.RE),
  })

  return ast
}

export function addRoute (ast, route_path, listenerFn) {
  var parsed_route = parseRoute(route_path)

  return _addRoute(ast, parsed_route.matches.slice(), parsed_route, listenerFn)
}

export function _processRoute (paths, route_paths, parsed_route) {
  var _route_path = route_paths.shift()

  return paths.some(function (_entry) {
    if( !_entry.test(_route_path) ) return

    if( !route_paths.length ) {
      _entry.listeners.forEach(function (listener) {
        listener.run( extractParams(listener.route_params.matches, parsed_route.paths) )
      })
      return true
    }

    return _processRoute(_entry._, route_paths, parsed_route)
  })
}

export function processRoute (paths, route_path) {
  var parsed_route = parsePath(route_path)

  return _processRoute(paths, parsed_route.paths.slice(), parsed_route )
}
