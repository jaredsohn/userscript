// ==UserScript==
// @name          EKNOZ's HF Special Links
// @namespace     EKNOZ/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.1
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) <br> The Creed Management - <a href='http://www.hackforums.net/managegroup.php?gid=51'>Manage Group</a> - <a href='http://www.hackforums.net/managegroup.php?action=joinrequests&gid=51'>Manage Group Requests</a> - <a href='http://www.hackforums.net/forumdisplay.php?fid=243'>Sub Forum</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);