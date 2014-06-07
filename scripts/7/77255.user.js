// ==UserScript==
// @name          Wikipedia rewrite URLs for redirects
// @namespace     http://henrik.nyh.se
// @description   Actually changes the URL when an article has been redirected (e.g. "Weekday" -> "Week"), which Wikipedia doesn't do. Should work for all languages.
// @include       http://*.wikipedia.org/wiki/Wikipedia*
// ==/UserScript==

if (!$('contentSub') || $('contentSub').innerHTML.indexOf("&amp;redirect=no") == -1) return;

var new_location = $('ca-nstab-project').getElementsByTagName("a")[0].href + window.location.hash;
window.location.replace(new_location);

function $(id) { return document.getElementById(id); }
