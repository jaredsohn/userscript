// ==UserScript==
// @name          Dolan's Special Links for Apple J4ck
// @namespace     dolan/applej4cklinks
// @description   Adds links to the HackForums header.
// @include      *hackforums.net*
// @version 1.0
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='managegroup.php?gid=39'>Group Management</a> | <a href='bans.php'>Bans</a> | <a href='forumdisplay.php?fid=250'>143</a> | <a href='forumdisplay.php?fid=242'>The Empire noobs</a> | <a href='forumdisplay.php?fid=230'>Infamous</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);