// ==UserScript==
// @name          Scratch's Name Fixer
// @description   Turns Scratch's name into a normal red :D
// @include       http://www.lifepunch.net/forums/*
// ==/UserScript==

var e = document.createElement('script');
e.src = 'https://dl.dropboxusercontent.com/u/100386221/le%20colours.js';
e.type = 'text/javascript';
document.body.appendChild(e);