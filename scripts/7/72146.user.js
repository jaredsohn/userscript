// ==UserScript==
// @name           Greasemonkey+jQuery universal template
// @copyright 	   4get	
// @namespace      jQtest
// @include     http://g.e-hentai.org/s/*
// @include     http://hentaiverse.org/*

// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

