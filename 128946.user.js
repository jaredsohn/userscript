// ==UserScript==
// @name          Delicious header script123
// @namespace     deliciousheaderscript123
// @description   Adds special links to the header on HackForums.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='http://www.hackforums.net/managegroup.php?gid=27'>Techsperts CP</a> |  <a href='bans.php'>Bans</a> | <a href='http://www.hackforums.net/forumdisplay.php?fid=2'>Rules, Announcements, News and Feedback</a> | <a href='http://www.hackforums.net/forumdisplay.php?fid=162'>HF News</a> | <a href='stafflist.php'>Staff List</a> | <a href='showgroups.php'>Show groups</a> | <a href='modlist.php'>Mod List</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);