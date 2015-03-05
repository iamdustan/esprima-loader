/**
 * Copyright 2015, Skookum Digital Works, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule esprima-loader
 */

var esprima = require('esprima-fb');
var estraverse = require('estraverse-fb');
var escodegen = require('escodegen');

module.exports = function(source, map) {
  if (this.cacheable) {
    this.cacheable();
  }

  // TODO: black list
  var resourcePath = this.resourcePath;

  var transforms = this.options.esprima && this.options.esprima.transforms;

  if (
    typeof transforms === 'undefined' ||
    transforms.length === 0
  ) {
    throw new Error(
      'You are attempting to use the esprima-loader without any transforms. ' +
      'View the usage example at ' +
      'https://www.github.com/Skookum/esprima-loader#Usage'
    );
  }

  var resultingAST = transforms.reduce(function(ast, transform) {
    return estraverse[transform.type || 'replace'](ast, transform);
  }, esprima.parse(source));

  var result = escodegen.generate(resultingAST);

  // TODO: make sure esprima is passing sourcemaps around
  // to include them here.
  if (this.sourceMap === false) {
    return this.callback(null, result);
  }

  this.callback(null, result);
};

