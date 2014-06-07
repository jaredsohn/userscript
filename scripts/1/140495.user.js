// ==UserScript==
// @name  Hackforums Header Script
// @namespace  Hades
// @description   Adds certain links to header area for the members.
// @include  http://hackforums.net/*
// @include  http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=234'>illuminati</a> | <a href='forumdisplay.php?fid=242'>The Empire</a> | <a href='usercp.php?action=usergroups'>Group Membership</a> | <a href='forumdisplay.php?fid=136'>Ebook Bazaar</a> | <a href='Bans.php'>Bans</a> | <a href='showstaff.php'>Staff</a> | <a href='forumdisplay.php?fid=2'>Announcements</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);