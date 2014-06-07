// ==UserScript==
// @name HF Scripts - Ignite's Personal Header Changes
// @namespace legacy/ignitesgroupsheader
// @description Adds a header link for Ignite.
// @include http://hackforums.net/*
// @include http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = "User CP</strong></a>";
var revised = "User CP</strong></a> &mdash; <a href='http://www.hackforums.net/managegroup.php?gid=21'>Group Management</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);