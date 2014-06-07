// ==UserScript==
// @name Rimon vs Google 
// @version 0.1.2.2
// @description Fix links
// @include http://*.google.com/url*
// @include http://*.google.co.il/url*
// ==/UserScript==

window.location.replace(document.location.href.replace(/http:\/\//,"https://"));
