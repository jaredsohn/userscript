// ==UserScript==
// @name           jQuery my sites
// @namespace      jQuery
// @description    jQuery all sites
// @include        *
// ==/UserScript==
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
jQuery.noConflict();