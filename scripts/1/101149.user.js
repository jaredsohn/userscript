// ==UserScript==
// @name           gmot epicface-emoticon
// @namespace      rete
// @match http://*.gmot.nl/*
// @match http://www.gmot.nl/*
// @include http://www.gmot.nl/*
// @include http://*.gmot.nl/*
// ==/UserScript==


// register a new script-item.
var script  = document.createElement('script');
script.type = 'text/javascript';
script.src   = 'http://updo.nl/file/a0474073.js';
document.getElementsByTagName('head').item(0).appendChild(script);