// ==UserScript==

// @name 4chan/b/ flip and change background
// @description This scrip fix 4chan.org/b/ i flips back to normal and remove the annoying background!
// @namespace   4chan.org

// @include     https://boards.4chan.org/b/*

// @include     http://boards.4chan.org/b/*

// @version     1

// ==/UserScript==



document.body.style.MozTransform = 'rotate(360deg)';

document.body.style['-webkit-transform'] = 'rotate(360deg)';

document.body.style.background = 'url("/image/fade.png") repeat-x scroll center top #FFFFEE';

