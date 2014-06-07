// ==UserScript==
// @name illuminati Header Script
// @namespace DarkDev
// @description Adds certain links to header area for the illuminati.
// @include  http://hackforums.net/*
// @include  http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=243'>Creed</a> | <a href='forumdisplay.php?fid=242'>Empire</a> | <a href='bans.php'>Bans</a> | <a href='showgroups.php'>Groups</a> | <a href='showstaff.php'>Staff</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);file:///C:/Users/krister/Downloads/130889.user.jsfile:///C:/Users/krister/Downloads/130889.user.js