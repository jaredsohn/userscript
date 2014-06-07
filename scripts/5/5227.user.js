// ==UserScript==
// @name           hide myspace cool new people
// @description    hides cool new people
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==

var b = document.getElementById("splash_coolNewPeople");
if (b) {b.parentNode.removeChild(b);}





