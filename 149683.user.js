// ==UserScript==
// @name        F L U B B Y
// @namespace     
// @description   Special Header Links For F L U B B Y
// @include      *hackforums.net*
// @version 1.0
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='forumdisplay.php?fid=185'>Runescape</a> | <a href='forumdisplay.php?fid=242'>The Empire</a> | <a href='forumdisplay.php?fid=184'>Red Lion</a> | <a href='showgroups.php'>Official Groups</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
