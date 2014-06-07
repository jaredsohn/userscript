// ==UserScript==
// @name Blizzard Diablo III Tooltips for SA
// @namespace http://hatsaregay.com
// @version 0.3
// @description Adds D3 tooltip link support
// @match http://forums.somethingawful.com/*
// @copyright 2012+, You, because you're worth it
// ==/UserScript==
var breadcrumb = document.getElementsByClassName("breadcrumbs")[0];
var gA = breadcrumb.getElementsByTagName("a")[3];
var href = gA.getAttribute("href");

//only apply if we're in the blizzard subforum!.
if (href == "forumdisplay.php?forumid=259") {
    var head = document.getElementsByTagName("head")[0]; 
    var nScript = document.createElement('script');
    nScript.type = 'text/javascript';
    nScript.src = 'http://us.battle.net/d3/static/js/tooltips.js';
    head.appendChild(nScript);
}