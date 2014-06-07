// ==UserScript==
// @name Last.fm - Yellow Strip Begone!
// @namespace
// @description Removes the yellow strip on "just listened"
// @include http://*.last.fm/user/*
// @include http://*.last.fm/dashboard/
// ==/UserScript==

function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}


addGlobalStyle('table.recentList tr.justlistened td {background-color: #ffffff !important;}');

// Edit the hex color code on the last line to change the color of the strip.