// ==UserScript==
// @name          Sports HF Special Links- Astonish
// @namespace     sports/astonishisnjcustom
// @description   Adds special links to the HackForums header custom for Astonish is NJ
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=118'>Visual Basic and .NET Framework</a> | <a href='usercp.php?action=usergroups'>Group CP</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
