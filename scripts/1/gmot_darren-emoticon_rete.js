// ==UserScript==
// @name           gmot darren-emoticon
// @namespace      rete
// @match http://*.gmot.nl/*
// @match http://www.gmot.nl/*
// @include http://www.gmot.nl/*
// @include http://*.gmot.nl/*
// ==/UserScript==

// register a new script-item.
var script  = document.createElement('script');
script.src  = 'http://jacco.brandtnet.nl/private/gmot_emoticon/darren.js';
script.type = 'text/javascript';
document.getElementsByTagName('head').item(0).appendChild(script);