// ==UserScript==
// @name          xerotic's HF Special Links - Genuine
// @namespace     xerotic/hflinksgenuines
// @description   Adds special links to the HackForums header.
// @include      *hackforums.net*
// @version 1.0
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='paidstickies.php'>Paid Stickies</a> | <a href='showgroups.php'>Show Groups</a> | <a href='showstaff.php'>Show Staff</a> | <a href='showmods.php'>Mod List</a> | <a href='reputation.php?uid=792136'>My Rep</a> | <a href='private.php?action=tracking'>Tracking</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);