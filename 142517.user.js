// ==UserScript==
// @name        no google home page add
// @namespace   http://google.com
// @include     https://www.google.com/
// @version     1
// ==/UserScript==
var noaderic = document.getElementById("prm");
noaderic.parentNode.removeChild(noaderic);