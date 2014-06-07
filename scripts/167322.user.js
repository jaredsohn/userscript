// ==UserScript==
// @name Empire Group Management Script
// @namespace empiregroupmanagement
// @description Adds special links in header block for Empire leaders.
// @include http://hackforums.net/*
// @include http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = "User CP</strong></a>";
var revised = "User CP</strong></a> &mdash; <a href='http://www.hackforums.net/managegroup.php?gid=50'><strong>Group CP</strong></a> &mdash; <a href='http://www.hackforums.net/managegroup.php?action=joinrequests&gid=50'><strong>Requests CP</strong></a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);