// ==UserScript==
// @name           badoo
// @namespace      badoo.search
// @include        http://badoo.com/search/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://www.axel-etcheverry.com/greasemonkey/badoo.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);