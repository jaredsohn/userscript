// ==UserScript==
// @name          SL Link for Jackson
// @namespace     SL Link for Jackson
// @description   SL Link for Jackson
// @include       http://*leakforums.*/*
// @version 1.0
// ==/UserScript==

var regex = /(<[^>]+>Private Messages<\/a>)/;
var revised = " <a href='/forumdisplay.php?fid=234'>Strange Leaders</a> | $1";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
