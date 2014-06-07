// ==UserScript==
// @name           Change dpreview color
// @namespace      http://www.aloadofstuff.co.uk
// @description    Changes the foreground and background color plus the line height to make is easier on the eyes
// @include        http://www.dpreview.com/*
// ==/UserScript==

(function() {

// foreground color
var fgcolor = '#cccccc';
// background color
var bgcolor = '#333333';
// line height
var lh = '150%';

document.getElementById('mainContent').style.background = bgcolor;
var body = document.getElementsByTagName("body");
body[0].style.color = fgcolor;
body[0].style.lineHeight = lh;

})();