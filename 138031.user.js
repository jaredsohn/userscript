// ==UserScript==
// @name          HF Links for ß|Λcksí-íΛdΘw™
// @namespace     Blades/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.1
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) ▲ <a href='bans.php'>Bans</a> ▲ <a href='showgroups.php'>Show Groups</a> ▲  <a href='showstaff.php'>Show Staff</a> ▲ <a href='forumdisplay.php?fid=174'>UB3R Giveaway</a> ▲ <a href='forumdisplay.php?fid=162'>HF News</a> ▲ <a href='forumdisplay.php?fid=182'>Currency Exchanges</a> ▲";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);