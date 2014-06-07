// ==UserScript==
// @name           EVE Files de-embed
// @namespace      http://jmillikin.selfip.org/greasemonkey/
// @description    When viewing a file on EVE Files, move it out of the iframe.
// @include        http://dl.eve-files.com/media/*
// ==/UserScript==

(function ()
{

var frame = document.getElementById ('main');
location.replace (frame.src);

})();