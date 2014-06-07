// ==UserScript==
// @name          Discussion Zone Script
// @namespace     DZ Script
// @description   Adds special links to the DiscussionZones header.
// @include       http://discussionzone.net/*
// @include       http://www.discussionzone.net/*
// @version 1.2
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='newpoints.php?action=virtualstock'>Stocks</a> | <a href='showteam.php'>Staff List</a> | <a href='usercp.php?action=usergroups'>Groups</a> | <a href='myawards.php'>Awards</a> |";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);