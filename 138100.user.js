// ==UserScript==
// @name          HF Links for Яǝʌǝɹsǝ 
// @namespace     Blades/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=230'>Infamous</a> | <a href='forumdisplay.php?fid=162'>HF News</a> | <a href='showgroups.php'>Show Groups</a> | <a href='showstaff.php'>Staff</a> | <a href='bans.php'>Bans</a> |  <a href='myawards.php'>Awards</a> | <a href='forumdisplay.php?fid=163'>Marketplace</a> |";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);