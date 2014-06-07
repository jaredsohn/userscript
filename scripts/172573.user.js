// ==UserScript==
// @name          Natha's UB3R Only Special Links
// @namespace     Natha/hflinks
// @description   Adds special custom ub3r links to the HF header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) <a href='/forumdisplay.php?fid=232'>SST Area</a> | <a href='/showgroups.php'>Groups</a> | <a href='/member.php?action=profile&uid=1502796'>Profile</a> | <a href='/forumdisplay.php?fid=232'>Apex Booter</a> ";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
