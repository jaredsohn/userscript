// ==UserScript==
// @name           Slate.com single-page
// @namespace      http://www.xyz.com
// @description    convert all slate pages into single-pages
// @include        http://www.slate.com/articles/*
// ==/UserScript==

// Get the current window location
var curLoc = window.location.href;
// Get the html text
var bodyText = document.body.textContent;

// ------------------------------------------------------------------------
// Redirect to single page view if option is available
// ------------------------------------------------------------------------

var linkLength = curLoc.length;
if(curLoc.substring(linkLength-12,linkLength) == '.single.html') return;
else {
    var frontLoc = curLoc.substring(0, linkLength-4);
    var newLoc = frontLoc+'single.html';
    window.location.replace(newLoc);
}