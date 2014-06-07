// ==UserScript==
// @name           Dicke Schrift fuer Twitter
// @namespace	   http://twitter.com/catearcher
// @description    Twitter, so, wie die Flauschwolke es haben will
// @include        http://twitter.com*
// @include        http://*.twitter.com*
// ==/UserScript==

var nav = document.getElementById('primary_nav');
nav.style.fontWeight = "bold";
nav.style.fontSize = "14px";