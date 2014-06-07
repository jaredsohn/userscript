// ==UserScript==
// @name          Natha's UB3R Only Special Links
// @namespace     Natha/hflinks
// @description   Adds special custom ub3r links to the HF header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) <a href='/forumdisplay.php?fid=135'>HF Ub3r Area</a> | <a href='/bans.php'>Banned Users</a> | <a href='/forumdisplay.php?fid=56'>HF l33t OT Discussions</a> | <a href='/forumdisplay.php?fid=140'>Ub3r Support</a> ";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);


