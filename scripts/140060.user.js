// ==UserScript==
// @name        Eye-cleansing Edge.org
// @description Read Edge.org without experiencing bloody eyesockets
// @namespace   http://iandennismiller.com
// @include     http://edge.org
// @include     http://edge.org/
// @include     http://edge.org/*
// @include     http://*.edge.org
// @include     http://*.edge.org/
// @include     http://*.edge.org/*
// @creator     Ian Dennis Miller <iandennismiller+userscripts@gmail.com>
// @version     0.1
// @date        2012-08-03
// ==/UserScript==

/*
Issues and Bugs
===============

https://github.com/iandennismiller/eye-cleansing-edge/issues

Changelog
=========

0.1 - Initial offering

License
=======

Copyright (C) 2012 Ian Dennis Miller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 
*/

// jquery injection technique from:
// http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  // overwrite all of the fixed width attributes
  $(".HomeRightPannel").css("display", "none");
  $(".HomeLeftPannel").css("width", "100%");
  $(".Container").css("width", "100%");
  $(".Header").css("width", "100%");
  $(".TopNav").css("width", "100%");
  $(".TopNavigation").css("width", "100%");
  $(".FooterContainer").css("width", "100%");
  $(".Footer1").css("width", "100%");
  $(".Footer2").css("width", "100%");
  $(".Footer3").css("width", "100%");

  // tweak content style to be a little breezier and bookish
  $(".InnerContContainer").css({
    'font-size': "13pt",
    "font-family": "times",
    "line-height": "15pt",
    "width": "45em",
    "float": "none",
    "margin": "0 auto"
  })
}

addJQuery(main);
