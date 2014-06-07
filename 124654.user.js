// ==UserScript==
// @name          Cozo's UG Special Links
// @namespace     Cozo's UG Links.
// @description   Adds special links to the UziGamings header.
// @include       http://uzigaming.com/*
// @include       http://www.uzigaming.com/*
// @version 1.1
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='showteam.php'>Staff List</a> | | <a href='usercp.php?action=usergroups'>Groups</a> |";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
