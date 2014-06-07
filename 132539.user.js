// ==UserScript==
// @name          xerotic's HF Special Links - Genuine
// @namespace     xerotic/hflinksgenuines
// @description   Adds special links to the HackForums header.
// @include      *hackforums.net*
// @version 1.0
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='paidstickies.php'>Paid Stickies</a> | <a href='showgroups.php'>Show Groups</a> | <a href='stafflist.php'>Staff List</a> | <a href='modlist.php'>Mod List</a> | <a href='private.php?action=tracking'>Tracking</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
