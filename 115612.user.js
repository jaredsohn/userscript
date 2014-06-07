// ==UserScript==
// @name          xerotic's HF Special Links - L33t
// @namespace     xerotic/hflinksl33t
// @description   Adds special links to the HackForums header for L33t members.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.1
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='paidstickies.php'>Paid Stickies</a> | <a href='showgroups.php'>Show Groups</a> | <a href='showstaff.php'>Staff List</a> | <a href='showmods.php'>Mod List</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);