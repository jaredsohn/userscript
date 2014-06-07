// ==UserScript==
// @name          HF Links for TheHackersLove
// @namespace     Blades/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.2
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) ▲  <a href='bans.php'>Bans</a> ▲ <a href='showstaff.php'>Staff</a> ▲ <a href='myawards.php'>Awards</a> ▲ <a href='showmods.php'>Mods</a> ▲ <a href='forumdisplay.php?fid=58'>The Alliance</a> ▲ <a href='forumdisplay.php?fid=62'>Reviewers</a> ▲ <a href='forumdisplay.php?fid=230'>Infamous</a> ▲ 	<a href='forumdisplay.php?fid=234'>Illuminati</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);