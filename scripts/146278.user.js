// ==UserScript==
// @name        Strokes's Logic/SRPP Header  
// @namespace     
// @description   Adds Special Header Links Including SRPP & Logic
// @include      *hackforums.net*
// @version 1.0
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='forumdisplay.php?fid=128'>SRPP</a> | <a href='forumdisplay.php?fid=236'>Logic</a> | <a href='showstaff.php'>Staff</a> | <a href='private.php?action=tracking'>PM Tracking</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);