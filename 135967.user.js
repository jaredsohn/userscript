// ==UserScript==
// @name          Godly's LF Special Links
// @namespace     Godly/LFlinks
// @description   Adds special links to the LeakForums header.
// @include       http://www.leakforums.org/*
// @include       http://www.leakforums.org/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='reputation.php?uid=1651'>My Rep</a> | <a href='myawards.php'>Awards</a> | <a href='stats.php'>Board Stats</a>  | <a href='usercp.php?action=profile'>Edit Profile</a> | <a href='reputation.php?action=add&uid=1651&pid=0'>Thank Godly</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);