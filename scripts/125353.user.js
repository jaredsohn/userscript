// ==UserScript==
// @name          Delicious header script
// @namespace     deliciousheaderscript
// @description   Adds special links to the header on HackForums.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='http://www.hackforums.net/forumdisplay.php?fid=2'>Rules, Announcements, News and Feedback</a> | <a href='http://www.hackforums.net/forumdisplay.php?fid=162'>HF News</a> | <a href='stafflist.php'>Staff List</a> | <a href='modlist.php'>Mod List</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);