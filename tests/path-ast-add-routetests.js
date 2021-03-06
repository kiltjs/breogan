/* global describe it */

import {addRoute} from '../src/path-ast'
import assert from 'assert'

function _cleanAST (ast) {
  ast.forEach(function (entry) {
    delete entry.test
    if( entry._ && !entry._.length ) delete entry._
    if( entry.listeners && !entry.listeners.length ) delete entry.listeners
    if( entry.listeners ) entry.listeners.forEach(function (listener) {
      delete listener.route_params
    })
    if( entry._ ) _cleanAST(entry._)
  })
  return ast
}

describe('path-ast: addRoute', function () {

  function _runTestCase (routes, route_paths) {

    it( routes.map( (route) => route.path ).join(', '), function () {

      var paths = []
      routes.forEach( (route) => addRoute(paths, route.path, route.listener) )

      assert.deepEqual( _cleanAST(paths), route_paths )

    })

  }

  [
    [
      [
        { path: 'foo', listener: 'runFoo' },
      ],
      [
        {
          slug: 'foo',
          listeners: [
            {
              run: 'runFoo',
            }
          ]
        }
      ]
    ],

    [
      [
        { path: 'foo/bar', listener: 'runFooBar' },
      ],
      [
        {
          slug: 'foo',
          _: [
            {
              slug: 'bar',
              listeners: [
                {
                  run: 'runFooBar',
                }
              ]
            }
          ]
        }
      ]
    ],

    [
      [
        { path: 'foo', listener: 'runFoo' },
        { path: 'foo/bar', listener: 'runFooBar' },
      ],
      [
        {
          slug: 'foo',
          listeners: [
            {
              run: 'runFoo',
            }
          ],
          _: [
            {
              slug: 'bar',
              listeners: [
                {
                  run: 'runFooBar',
                }
              ]
            }
          ]
        }
      ]
    ],

    [
      [
        { path: 'foo', listener: 'runFoo' },
        { path: 'foo/:bar', listener: 'runFooBar' },
      ],
      [
        {
          slug: 'foo',
          listeners: [
            {
              run: 'runFoo',
            }
          ],
          _: [
            {
              slug: '^(.*?)$',
              listeners: [
                {
                  run: 'runFooBar',
                }
              ]
            }
          ]
        }
      ]
    ],

  ].forEach( (test_case) => _runTestCase.apply(null, test_case) )

})
