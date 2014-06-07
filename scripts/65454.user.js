// Songeek Micro Player for Greasemonkey/Chrome
// version 1.4b
// 2010-19-Dec
// Copyright (c) 2009-2010, boeck (boeck@boeckmania.de)
// Songeek.de
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey Firefox extension : http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Click on install.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name            Songeek Micro Player
// @namespace       http://userscripts.org/scripts/show/65454
// @description     Adds a "play button" to any mp3 file on the current site that allows you to play mp3 files directly, share on facebook, tweet them or save the location on Songeek.de.
// @include         http://*
// ==/UserScript==
//
// --------------------------------------------------------------------


var t = setTimeout(function() {

for (var count = 0; count <
document.getElementsByTagName('script').length; count++) {
if (document.getElementsByTagName('script')[count].src ==
"http://songeek.de/js/interlude.js") { return;}
}

  window.location.href = 'javascript:(function(){var o=document.createElement("script");o.type="text/javascript";o.src="http://songeek.de/js/interlude.js";o.onload=function(){Songeek.Mp3.go()};document.body.appendChild(o)})()';
}, 500)