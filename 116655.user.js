// ==UserScript==
// @name          xerotic's HF Special Links - Reactionz
// @namespace     xerotic/hflinksreactionz
// @description   Adds special links to the HackForums header custom for Reactionz
// @include       http://forum.tribalwars.ae/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='forumdisplay.php?fid=107'>Premium Sellers Section</a> | <a href='paidstickies.php'>Paid Stickies</a> | <a href='forumdisplay.php?fid=2'>Announcements</a> | <a href='stafflist.php'>Staff List</a> | <a href='modlist.php'>Mod List</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);