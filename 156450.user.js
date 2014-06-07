// ==UserScript==
// @name          HF Script - Orgy's Special Header Links
// @namespace     xerotic/orgyspecialheaderlinks
// @description   Adds certain links to header area for Orgy.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=92'>Botnet</a> | <a href='forumdisplay.php?fid=163'>Marketplace Discussions</a> | <a href='forumdisplay.php?fid=169'>Call of Duty</a> | <a href='forumdisplay.php?fid=2'>Rules</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
