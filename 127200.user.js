// ==UserScript==
// @name          Respawn Gaming Special Links made by Sports.
// @namespace     sports/respawngaminghfheader
// @description   Adds special links to the HackForums header custom for Respawn
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='showthread.php?tid=2212126'>Group Lounge</a> | <a href='forumdisplay.php?fid=195'>Gamertags</a> | <a href='forumdisplay.php?fid=82'>Xbox 360 and Live Gaming</a> | <a href='forumdisplay.php?fid=200'>SubForum</a> | <a href='stafflist.php'>Staff List</a> | <a href='forumdisplay.php?fid=14'>PC</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
