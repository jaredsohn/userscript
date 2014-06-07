// ==UserScript==
// @name          Yellows' HF Special Links Edit
// @namespace     xerotic/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.2
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='showstaff.php'>Staff List</a> | <a href='negreplog.php'>Neg Rep Log</a> | <a href='private.php?action=tracking'>Tracking</a> | <a href='showgroups.php'>Show Groups</a> | <a href='bans.php'>Bans</a> | <a href='showmods.php'>Mod List</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
