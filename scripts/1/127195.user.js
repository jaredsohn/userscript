// ==UserScript==
// @name          Red Lions Special Links made by Sports.
// @namespace     sports/redlionslinkheaders
// @description   Adds special links to the HackForums header custom for Red Lions
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='showthread.php?tid=2282109'>Group Lounge</a> | <a href='showthread.php?tid=2212904'>Forum Assistance</a> | <a href='forumdisplay.php?fid=105'>Marketplace</a> | <a href='forumdisplay.php?fid=184'>SubForum</a> | <a href='stafflist.php'>Staff List</a> | <a href='bans.php'>Bans</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);