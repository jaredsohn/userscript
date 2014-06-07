// ==UserScript==
// @name          HF Script - Rattlesnake's Special Header Links
// @namespace     xerotic/orgyspecialheaderlinks
// @description   Adds certain links to header area for Orgy.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=202'>Marketers</a> | <a href='forumdisplay.php?fid=163'>Marketplace Discussions</a> | <a href='forumdisplay.php?fid=107'>Premium Sellers</a> | <a href='forumdisplay.php?fid=44'>Buyers Bay</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);

