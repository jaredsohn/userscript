// ==UserScript==
// @name          Aswonish is NJ - Custom - Made By CARTEL.
// @namespace     cartel/astonishcustomheader
// @description   Adds special links to the HackForums header custom for Respawn
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=200'>Respawn</a> | <a href='forumdisplay.php?fid=118'>VB</a> | <a href='forumdisplay.php?fid=2'>Rules</a> | <a href='usercp.php?action=usergroups'>User Groups</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
