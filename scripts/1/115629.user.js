// ==UserScript==
// @name          xerotic's HF Special Links - L33t
// @namespace     xerotic/hflinksl33t
// @description   Adds special links to the HackForums header for L33t members.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='paidstickies.php'>Paid Stickies</a> | <a href='showgroups.php'>Show Groups</a> | <a href='stafflist.php'>Staff List</a> | <a href='modlist.php'>Mod List</a> | <a href='misc.php?action=help&hid=11.php'>Reporting</a> | <a href='usercp.php?action=subscriptions'>Subscriptions</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);