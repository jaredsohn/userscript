// ==UserScript==
// @name          Reported's HF Special Links
// @namespace     Reported/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='negreplog.php'>Neg Rep Log</a> | <a href='paidstickies.php'>Paid Stickies</a> | <a href='member.php?action=profile'>Profile</a> | <a href='member.php?action=profile'>Mod CP</a> | <a href='showgroups.php'>Show Groups</a> | <a href='private.php?action=tracking' >Tracking</a> | <a href='stafflist.php'>Staff List</a> | <a href='modlist.php'>Mod List</a> | <a href='showthread.php?tid=1806302&pid=16612513#pid16612513'>Helpful Post Link</a";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);