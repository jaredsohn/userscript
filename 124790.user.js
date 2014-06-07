// ==UserScript==
// @name          r00t3r
// @namespace     r00t3r/wflinks
// @description   Adds special links to the Wizard Forums Header.
// @include       http://wizardforums.com/*
// @include       wizardforums.com/*
// @version 1.0
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='misc.php?action=help'>Help Docs</a> | <a href='myawards.php'>Awards</a> | <a href='showteam.php'>Show Team</a> | <a href='stats.php'>Forum Stats</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
