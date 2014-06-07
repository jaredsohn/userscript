// ==UserScript==
// @name          LF Links for Sexuality
// @namespace     Sexuality/LF links
// @description   Adds special links to the LeakForums header.
// @include       http://leakforums.org/*
// @include       http://www.leakforums.org/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php?'>Bans</a> |";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);