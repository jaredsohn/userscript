// ==UserScript==
// @name          Cozo's UG Special Link's
// @namespace     Cozo's UG Link's.
// @description   Adds special links to the UziGamings header.
// @include       http://uzigaming.net/*
// @include       http://www.uzigaming.net/*
// @version 1.2
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='showteam.php'>Staff List</a> | <a href='usercp.php?action=usergroups'>Groups</a> | <a href='misc.php?action=help'>Help</a> |";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
