// ==UserScript==
// @name          Special Links for Pali
// @namespace     Blades/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.1
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) ▲ <a href='forumdisplay.php?fid=230'>Infamous</a> ▲ <a href='forumdisplay.php?fid=124'>Rhythm</a> ▲ <a href='forumdisplay.php?fid=234'>Illuminati</a> ▲ <a href='forumdisplay.php?fid=235'>Valor</a> ▲ <a href='showgroups.php'>Groups</a> ▲ <a href='bans.php'>Bans</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);

