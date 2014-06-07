// ==UserScript==
// @name        4chan /b/ flip
// @namespace   4chan.org
// @include     https://boards.4chan.org/b/*
// @include     http://boards.4chan.org/b/*
// @version     1
// ==/UserScript==

document.body.style.MozTransform = 'rotate(360deg)';
document.body.style['-webkit-transform'] = 'rotate(360deg)';