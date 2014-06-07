// ==UserScript==
// @name          Hoss' special WF links
// @namespace     hoss/links
// @description   Adds special links to the WWEForums header.
// @include       http://wweforums.net/*
// @include       http://www.wweforums.net/*
// @version 1.1
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='negreplog.php'>Neg Rep Log</a> | <a href='paidstickies.php'>Paid Stickies</a> | <a href='showgroups.php'>Show Groups</a> | <a href='showstaff.php'>Staff List</a> | <a href='showmods.php'>Mod List</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
