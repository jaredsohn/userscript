// ==UserScript==
// @name          xerotic's MODDED LINKS
// @namespace     xerotic/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='managegroup.php?gid=39'>Manage Group</a> | <a href='paidstickies.php'>Paid Stickies</a> | <a href='showgroups.php'>Show Groups</a> | <a href='stafflist.php'>Staff List</a> | <a href='modlist.php'>Mod List</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);