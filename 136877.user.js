// ==UserScript==
// @name          reminiscent's HF Special Links
// @namespace     reminiscents/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) ▲ <a href='forumdisplay.php?fid=230'>Propitious</a> ▲ <a href='forumdisplay.php?fid=199'>Eminence</a> ▲ <a href='bans.php'>Bans</a> ▲ <a href='negreplog.php'>Neg Rep List</a> ▲ <a href='showgroups.php'>Show Groups</a> ▲ <a href='stafflist.php'>Staff List</a> ▲ <a href='showmods.php'>Mod List</a> ▲";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);