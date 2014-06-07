// ==UserScript==

// @name          Unhide G+

// @namespace     http://www.linuxwrangling.com

// @description   Unhide G+ so it will display without allowing javascript.

// @include       https://plus.google.com/*

// ==/UserScript==



var body = document.getElementsByTagName('body');

body.style.visibility = 'visible';
