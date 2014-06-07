// ==UserScript==
// @name         DuggMirror Ad Remover
// @description  v0.1 - Remove the first div from duggmirror sites (which should be the big ad at the top)
// @include      http://*duggmirror.com/*/*
// ==/UserScript==

var firstdiv = document.getElementsByTagName('div')[0];

if ( firstdiv != null ) { firstdiv.parentNode.removeChild(firstdiv); }