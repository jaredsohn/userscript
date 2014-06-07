// ==UserScript==
// @name          xerotic's HF Special Links
// @namespace     xerotic/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1)  <a href='forumdisplay.php?fid=162'>HF News</a> | <a href='forumdisplay.php?fid=77'>Graphic Masters</a> | <a href='forumdisplay.php?fid=128'>SRPP</a> | <a href='forumdisplay.php?fid=210'>Writers</a> | <a href='stafflist.php'>Staff List</a> | <a href='modlist.php'>Mod List</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);

