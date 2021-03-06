var assert = require('assert');
var child = require('child_process');
var fs = require('fs');
var purecss = require('../index.js');
var path = require('path');
var Stream = require('stream').Readable;

var features = [
  'vars'
];

/**
 * purecss node API tests.
 */
describe('purecss', function () {
  it('should return a css string', function () {
    assert('string' === typeof purecss('body {}'));
  });
});

/**
* Rework feature tests.
*/
describe('features', function () {
  features.forEach(function (name) {
    it('should add ' + name + ' support', function () {
      var input = read('features/' + name);
      var output = read('features/' + name + '.out');
      assert.equal(purecss(input).trim(), output.trim());
    });
  });
});

/**
 * @import feature
 */
describe('@import feature', function () {
  it('should add path option support', function () {
      var input = read('features/imprt');
      var output = read('features/imprt.out');
      assert.equal(purecss(input,
                           {path:"test/features/imprt.css"}).trim(),
                   output.trim());
  });
  
  it('should add base option support', function () {
      var input = read('features/imprt');
      var output = read('features/imprt.out');
      assert.equal(purecss(input,
                           {
                            path:"imprt.css",
                            base: "test/features/"
                           }).trim(),
                   output.trim());
  });
});

/**
* Read a fixture by `filename`.
*
* @param {String} filename
* @return {String}
*/

function read (filename) {
  var file = resolve(filename);
  return fs.readFileSync(file, 'utf8');
}

/**
* Resolve a fixture by `filename`.
*
* @param {String} filename
* @return {String}
*/

function resolve (filename) {
  return path.resolve(__dirname, filename + '.css');
}