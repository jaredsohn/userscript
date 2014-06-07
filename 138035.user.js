// ==UserScript==
// @name          HF Links for Chris
// @namespace     Blades/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1)  <a href=' forumdisplay.php?fid=22'>Staff Discussion</a> | <a href='bans.php'>Bans</a> | <a href='forumdisplay.php?fid=169'>Gaming</a> | <a href='forumdisplay.php?fid=230'>Infamous</a> | <a href='forumdisplay.php?fid=2'>Announcements</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);