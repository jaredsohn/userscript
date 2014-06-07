// ==UserScript==
// @name HF Scripts - The Creed Group Management Script - EKNOZ
// @namespace xDowwdeen/The Creed Management
// @description Adds special links in header block for The Creed Leaders - - EKNOZ
// @include http://hackforums.net/*
// @include http://www.hackforums.net/*
// @version 1.1
// ==/UserScript==

var regex = '<!-- start: nav -->';
var revised = "<!-- start: nav --><div class='pm_alert'>The Creed Management - <a href='http://www.hackforums.net/managegroup.php?gid=51'>Manage Group</a> — <a href='http://www.hackforums.net/managegroup.php?action=joinrequests&gid=51'>Manage Group Requests</a> — <a href='http://www.hackforums.net/forumdisplay.php?fid=243'>Sub Forum</a></div>";
document.getElementById('content').innerHTML= document.getElementById('content').innerHTML.replace(regex,revised);