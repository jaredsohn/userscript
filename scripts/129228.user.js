// ==UserScript==
// @name          Sports WF Custom Header
// @namespace     sports/wizardforumscustomheader
// @description   Adds special links to the Wizard Forums header
// @include       http://wizardforums.com/*
// @include       http://www.wizardforums.com/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='showteam.php'>Staff</a>   <a href='bans.php'>Bans</a>   <a href='Forum-The-Lounge'>The Lounge</a>   <a href='Forum-Announcements-and-Feedback'>Annoucements</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
