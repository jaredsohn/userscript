// ==UserScript==
// @name          Special Bar Mod by Rhythm
// @namespace     xerotic/hflinks
// @description   Adds links to header, especially helpful for group leaders.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='managegroup.php?gid=23'>Group CP</a> | <a href='managegroup.php?action=joinrequests&gid=23'>Join Requests</a> | <a href='bans.php'>Bans</a> | <a href='negreplog.php'>Neg Rep Log</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
