
function Router (baseHref) {
  this.routes = {};
  this.states = {};
  this.baseHref = baseHref ? ('/' + baseHref.replace(/^\/|\/$/g, '') + '/' ) : '/';
}

function cleanParamName (paramName) {
  return paramName.substr(1);
}

var RE_path = /:[a-zA-Z][a-zA-Z0-9_]*/g;

Router.prototype.route = function (route, handler) {
  var key_route = route.replace(RE_path, '{{}}');

  this.routes[key_route] = {
    route: route,
    handler: handler,
    re: new RegExp( '^' + route.replace(RE_path, '([a-zA-Z][a-zA-Z0-9_]*?)') + '$' )
  };
};

Router.prototype.run = function (route) {
  var matches;
  for( var key_route in this.routes ) {
    matches = route.match(this.routes[key_route].re);
    if( matches ) {
      this.routes[key_route].handler.apply(this, matches.slice(1) );
      return;
    }
  }
  throw { route: route, missing: true };
};

Router.prototype.state = function (state_name, options) {

};

module.exports = Router;
