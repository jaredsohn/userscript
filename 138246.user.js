// ==UserScript==
// @name HF Scripts - Techsperts Group Management Script
// @namespace xerotic/techspertsgroupmanagement
// @description Adds special links in header block for Techsperts leaders.
// @include http://exiledforums.co.uk/*
// @include http://www.exiledforums.co.uk/*
// @version 1.0
// ==/UserScript==

var regex = "User CP</strong></a>";
var revised = "User CP</strong></a> &mdash; <a href='http://exiledforums.co.uk/managegroup.php?gid=11'>Members</a> &mdash; <a href='http://exiledforums.co.uk/managegroup.php?action=joinrequests&gid=11'>Requests</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);