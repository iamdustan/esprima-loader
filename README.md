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

Copyright 2015 Skookum Digital Works, Inc. All Right Reserved
MIT...


