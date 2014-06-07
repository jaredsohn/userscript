// ==UserScript==
// @name       Weatherspark Hide Ads
// @namespace  http://stereo.lu/weatherspark
// @version    0.1
// @description  Hides ads on the wonderful weatherspark
// @match      http://weatherspark.com/*
// @copyright  2013, Guillaume Rischard under a Creative Commons CC-0 license
// ==/UserScript==

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    // Selectors start here
    '.app #flashContentContainer { right: 0px; }';
document.getElementsByTagName("HEAD")[0].appendChild(link);