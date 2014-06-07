// ==UserScript==
// @name        Bitstrips Blocker
// @namespace   http://www.matthewbacklas.com
// @description Blocks Bitstrips by anchor tag
// @include     https://www.facebook.com/*
// @version     2.0
// @grant       none
// ==/UserScript==
setInterval(function(){var e;e=document.getElementsByTagName("a");var t;t=e.length;for(var n=0;n<t;n++){var r=e[n].innerHTML;if(r.indexOf("Bitstrips")>-1){e[n].parentNode.parentNode.parentNode.parentNode.style.display="none"}}},5e3)