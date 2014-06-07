// ==UserScript==
// @name          Sports HF Special Links- Confuse
// @namespace     sports/confusecustomheader
// @description   Adds special links to the HackForums header custom for Confuse
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=25'>Lounge</a> | <a href='showthread.php?tid=2212904'>Forum Assistance</a> | <a href='forumdisplay.php?fid=82'>Xbox 360 and Live</a> | <a href='bans.php'>Bans</a> | <a href='forumdisplay.php?fid=2'>Annoucements</a> | <a href='negreplog.php'>Neg Rep</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
