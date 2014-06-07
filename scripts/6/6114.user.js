// ==UserScript==
// @name          Teve-Blad Lite
// @namespace     http://dweezil.be/greasemonkey
// @description   strips teveblad.be down to only the tv-roster / toont enkel het tv rooster in teveblad.be
// @include       http://teveblad.be/FS_index.htm
// @include       http://*.teveblad.be/FS_index.htm
// @exclude
// ==/UserScript==

window.location.href = window.location.href.replace(/FS_index.htm/, 'ndl/grid.asp');
