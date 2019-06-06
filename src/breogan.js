
import {addRoute, processRoute} from './path-ast'

function Router (_base_href) {
  this.ast = []
  // this.states = {}
  // this.base_href = base_href ? ('/' + base_href.replace(/^\/|\/$/g, '') + '/' ) : '/'
}

Router.prototype.route = function (route, handler) {
  addRoute(this.ast, route, handler)
}

Router.prototype.run = function (route) {
  processRoute(this.ast, route)
}

Router.prototype.state = function (_state_name, _options) {

}

export default Router
