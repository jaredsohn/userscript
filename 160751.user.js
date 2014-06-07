// ==UserScript==
// @name          LINKZXX for Jackson
// @namespace     LINKZXX for Jackson
// @description   LINKZXX for Jackson
// @include       http://*leakforums.*/*
// @version 1.0
// ==/UserScript==

var regex = /(<[^>]+>Private Messages<\/a>)/;
var revised = " <a href='/forumdisplay.php?fid=234'>Strange Leaders</a> |  <a href='/forumdisplay.php?fid=157'>Spectrum</a> | $1";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
