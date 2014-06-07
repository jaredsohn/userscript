// ==UserScript==
// @name HF Scripts - Techsperts Group Management Script
// @namespace xerotic/techspertsgroupmanagement
// @description Adds special links in header block for Techsperts leaders.
// @include http://hackforums.net/*
// @include http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = "User CP</strong></a>";
var revised = "User CP</strong></a> &mdash; <a href='http://www.hackforums.net/managegroup.php?gid=51'>The Creed - Members</a> &mdash; <a href='http://www.hackforums.net/managegroup.php?action=joinrequests&gid=51'>The Creed - Requests</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);