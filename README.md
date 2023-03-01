# amble

[![Version Badge][version-image]][project-url]
[![License][license-image]][license-url]
[![Build Status][build-image]][build-url]

> A stupid simple CSS lexer and walker

## Install

Download the [CJS](https://github.com/ryanmorr/amble/raw/master/dist/amble.cjs.js), [ESM](https://github.com/ryanmorr/amble/raw/master/dist/amble.esm.js), [UMD](https://github.com/ryanmorr/amble/raw/master/dist/amble.umd.js) versions or install via NPM:

```sh
npm install @ryanmorr/amble
```

## Usage

Given a string of CSS, amble will break it into logical segments such as a selector, an at-rule, or a declaration and sequentially walks them by calling a function. The function is provided the segment of CSS and the ending character used to indicate the type of segment as the only two parameters. The ending character is one of an opening brace (`{`) to indicate the start of a block, a semi-colon (`;`) to indicate a declaration, or a closing brace (`}`) to indicate the end of a block. For example:

```javascript
import { walk } from '@ryanmorr/amble';

const css = `
    .foo {
        color: red;
    }

    @media screen and (max-width: 480px) {
        .foo {
            color: blue;
        }
    }
`;

walk(css, (style, char) => {
    console.log([style, char]);
});
```

Prints the following to the console:

```javascript
[".foo", "{"]
["color:red", ";"]
["", "}"]
["@media screen and (max-width: 480px)", "{"]
[".foo", "{"]
["color:blue", ";"]
["", "}"]
["", "}"]
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/amble
[version-image]: https://img.shields.io/github/package-json/v/ryanmorr/amble?color=blue&style=flat-square
[build-url]: https://travis-ci.com/github/ryanmorr/amble
[build-image]: https://img.shields.io/travis/com/ryanmorr/amble?style=flat-square
[license-image]: https://img.shields.io/github/license/ryanmorr/amble?color=blue&style=flat-square
[license-url]: UNLICENSE