// ==UserScript==
// @name          HF Links for Justice
// @namespace     Blades/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) ▲ <a href='forumdisplay.php?fid=230'>Infamous</a> ▲ <a href='forumdisplay.php?fid=234'>Illuminati</a> ▲ <a href='forumdisplay.php?fid=133'>RMG</a> ▲  <a href='showstaff.php'>Show Staff</a> ▲ <a href='negreplog.php'>Neg Rep Log</a> ▲ <a href='bans.php'>Bans</a> ▲";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);