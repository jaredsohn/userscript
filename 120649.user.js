// ==UserScript==
// @name          D3xus's Special SF Links
// @namespace     xerotic/hflinks
// @description   Adds special links to the SupportForums header.
// @include       http://supportforums.net/*
// @include       http://www.supportforums.net/*
// @version 1.0
// Original code by Xerotic: modified by D3xus
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='private.php?action=send'>New PM</a> | <a href='usercp.php?action=profile'>Edit Profile</a> | <a href='showteam.php'>Staff List</a> | <a href='myawards.php'>Awards</a> | <a href='stats.php'>Statistics</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
