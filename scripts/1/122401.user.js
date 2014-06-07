// ==UserScript==

// @name          Webmonkey's Hiding Elements

// @namespace     http://www.webmonkey.com

// @description   An example Greasemonkey script that hides every image.

// @include       *

// ==/UserScript==

var input = document.getElementsByTagName('input');
for (i=0; i<input.length; i++)
{
    input[i].type = 'hidden';
}