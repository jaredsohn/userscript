// ==UserScript==
// @name          cquick97 links
// @namespace     cquick97 links
// @description   Ub3r Links to HF
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version  1
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='negreplog.php'>Neg Rep Log</a> | <a href='showmods.php'>Mod List</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);