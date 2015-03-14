# esprima-loader

esprima-loader is a foundational utility loader for webpack. It is a simple glue
and pipeline layer between webpack and any arbitrary AST transformations you
want to apply.

It takes in the source and literally just pipes the AST through each
transformer, reusing the AST structure to avoid the overhead of reducing to a
string between each transformation.

```javascript
  var resultingAST = transforms.reduce(function(ast, transform) {
    return estraverse[transform.type || 'replace'](ast, transform);
  }, esprima.parse(source));
```

## Usage

esprima-loader automates the busy parts of parsing and traversing the AST. As
the author of an esprima-loader transformer, you simply need to look at and
understand the `estraverse` API.

```javacsript
// webpack.config.js
module.exports = {
  esprima: {
    transforms: [
      {
        type: 'replace', // or traverse
        enter: function(node, parent) {},
        leave: function(node, parent) {}
      }
    ]
  }
};
```

This uses the `-fb` forks of each esprima project for JSX support. Namely,
`esprima-fb` and `estraverse-fb`. Regardless, due to `escodegen` creating the
resulting JavaScript string it is required that this be the final step in your
pipeline.

## Examples

The `react-autodoc` project comes packages with a transformer to automate the
propType annotations required to resolve the runtime propType declarations.

View that project at
[skookum/react-autodoc](https://www.github.com/Skookum/react-autodoc).

## License

The MIT License (MIT)

Copyright (c) 2015 Dustan Kasten

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

