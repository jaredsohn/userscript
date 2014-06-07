// ==UserScript==
// @name          Natha's Special Links
// @namespace     Natha/hflinks
// @description   Adds special custom links to the HF header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) <a href='/forumdisplay.php?fid=2'>(Example)</a> ";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);


