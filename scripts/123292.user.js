// ==UserScript==
// @name          HF Script - Diabolic's Special Header Links
// @namespace     diabolic/mespecialheaderlinks
// @description   Adds certain links to header area for Diabolic.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='/showgroups.php'>Show Groups</a> | <a href='/forumdisplay.php?fid=2'>RAN&F</a> | <a href='forumdisplay.php?fid=25'>The Lounge</a> | <a href='/postactivity.php'>Post Activity</a>";;
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);