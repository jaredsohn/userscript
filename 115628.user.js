// ==UserScript==
// @name          xerotic's HF Special Links - L33t
// @namespace     xerotic/hflinksl33t
// @description   Adds special links to the HackForums header for L33t members.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | | <a href='showthread.php?tid=1942290&pid=18136061#pid18136061'>Helpful Posts</a> | <a href='forumdisplay.php?fid=88'>Computing</a> | <a href='forumdisplay.php?fid=8'>MCT</a> | <a href='forumdisplay.php?fid=137.php'>iPhone and iPod Touch</a> | <a href='forumdisplay.php?fid=200'>Reverence</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);



