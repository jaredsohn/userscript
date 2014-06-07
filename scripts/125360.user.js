// ==UserScript==
// @name          Delicious header scripttest
// @namespace     deliciousheaderscript
// @description   Adds special links to the header on HackForums.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==
var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='http://www.hackforums.net/usercp.php'>http://www.hackforums.net/usercp.php</a> | <a href='http://www.hackforums.net/usercp.php'>l</a> | <a href='http://www.hackforums.net/usercp.php'>la</a> | <a href='http://www.hackforums.net/usercp.php'>lal</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel')innerHTML.replace(regex,revised);