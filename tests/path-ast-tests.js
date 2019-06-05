/* global describe it */

import {addRoute} from '../src/path-ast'
import assert from 'assert'

function _cleanAST (ast) {
  ast.forEach(function (entry) {
    delete entry.test
    if( entry.paths && !entry.paths.length ) delete entry.paths
    if( entry.listeners && !entry.listeners.length ) delete entry.listeners
    if( entry.listeners ) entry.listeners.forEach(function (listener) {
      delete listener.route_params
    })
    if( entry.paths ) _cleanAST(entry.paths)
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
          str: 'foo',
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
          str: 'foo',
          paths: [
            {
              str: 'bar',
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
          str: 'foo',
          listeners: [
            {
              run: 'runFoo',
            }
          ],
          paths: [
            {
              str: 'bar',
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
          str: 'foo',
          listeners: [
            {
              run: 'runFoo',
            }
          ],
          paths: [
            {
              str: '^(.*?)$',
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
