// ==UserScript==
// @name          xerotic's HF Special Links
// @namespace     xerotic/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='usercp.php?action=subscriptions'>Your subscriptions</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
