// ==UserScript==
// @name         Header links for Siberian
// @namespace     Siberian
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='negreplog.php'>Neg Rep Log</a> | <a href='disputedb.php'>Deal Dispute DB</a> | <a href='showgroups.php'>Show Groups</a> | <a href='showstaff.php'>Staff List</a> | <a href='uhsearch.php>Username Search</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
