// ==UserScript==
// @name HF Scripts - Genuine Group CP
// @namespace Blades/GenuineSpecialLink
// @description Adds special links in header block for Genuine
// @include http://hackforums.net/*
// @include http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = "User CP</strong></a>";
var revised = "User CP</strong></a> &mdash; <a href='http://www.hackforums.net/managegroup.php?gid=46'>Group CP</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);lementById('panel').innerHTML.replace(regex,revised);