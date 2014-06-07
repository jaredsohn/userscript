// ==UserScript==

// @name          La Panto

// @namespace     http://www.webmonkey.com

// @description   A basic example of Greasemonkey that causes an alert at each page load.

// @include       *

// ==/UserScript==

var links = document.getElementsByClassName("js-like-link");
console.log(links);