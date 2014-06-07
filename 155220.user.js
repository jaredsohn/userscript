// ==UserScript==
// @name          Reminiscing's FW Special Links
// @namespace     Reminiscing/fwlinks
// @description   Adds special links to the ForumsWeb header.
// @include       http://forumsweb.net/*
// @include       http://www.forumsweb.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='modcp.php?action=finduser'>Profile Editor</a> | <a href='modcp.php?action=ipsearch'>IP Search</a> | <a href='forumdisplay.php?fid=61'>Staff Forums</a> | <a href='modcp.php?action=warninglogs'>Warning Logs</a> | <a href='showteam.php'>Staff List</a> | <a href='online.php'>Online Activity</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
