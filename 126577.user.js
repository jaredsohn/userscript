// ==UserScript==
// @name          HF Script - Phybers's Special Header Links
// @namespace     xerotic/orgyspecialheaderlinks
// @description   Adds certain links to header area for Phyber.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=110'>White Hat Help</a> | <a href='forumdisplay.php?fid=4'>Beginner Hacking</a> | <a href='forumdisplay.php?fid=25'>Lounge</a> | <a href='forumdisplay.php?fid=217'>Partnerships, Hiring, and Personnel</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);