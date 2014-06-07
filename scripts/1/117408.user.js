// ==UserScript==
// @name          Chipmonkz Special Links
// @namespace     Chipmonkz/l33tslinks
// @description   Adds special links to the L33TForums header.
// @include       http://www.l33ts.org/*
// @include       http://www.l33ts.org/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='/forum/bans.php'>Bans</a> | <a href='/forum/showteam.php'>Forum Team</a> | <a href='forum/myawards.php'>Awards</a> | <a href='forum/usercp.php?action=usergroups'>Groups</a>|
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
