// ==UserScript==
// @name        Saga
// @namespace     
// @description   Special Header Links For Saga
// @include      *hackforums.net*
// @version 1.0
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=105'>Marketplace</a> | <a href='bans.php'>Bans</a> | <a href='showgroups.php'>Groups</a> | <a href='forumdisplay.php?fid=242'>The Empire</a> | <a href='forumdisplay.php?fid=202'>Marketers</a> | <a href='forumdisplay.php?fid=124'>Rhythm</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);