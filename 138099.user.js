// ==UserScript==
// @name          HF Links for Hedro
// @namespace     Blades/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) ▲ <a href='forumdisplay.php?fid=230'>Infamous</a> ▲ <a href='forumdisplay.php?fid=77'>Graphics Masters</a> ▲ <a href='forumdisplay.php?fid=2401617'>Sales Thread</a> ▲  <a href='showgroups.php'>Show Groups</a> ▲ <a href='showstaff.php'>Staff</a> ▲";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);