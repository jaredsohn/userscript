// ==UserScript==
// @name           Danker
// @namespace      danker
// @include        http://forum.lrytas.lt/*
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'http://atviras.lt/mwf/attach/88/6188/danker_wysiwyg.js';
headID.appendChild(newScript);