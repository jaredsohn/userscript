// ==UserScript==
// @name           Super easy YouTube HD 720p
// @namespace      http://userscripts.org/scripts/show/150407
// @description    Easiest YouTube HD 720p 
// @include        http*://*youtube.com/watch?* 
// @exclude        *&hd=1*
// @grant	   none

// ==/UserScript==
window.location.replace (window.location.href + "&hd=1");