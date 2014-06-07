// ==UserScript==
// @name           zdnet wider main column
// @namespace      http://www.dlugosz.com
// @include        http://blogs.zdnet.com/storage/*
// ==/UserScript==

var el= document.getElementById ('main');
el.style.backgroundImage= "none";  // get rid of line at original right edge
el= document.getElementById ('content');
el.style.width="100%";
el= document.getElementById ('col1');
el.style.width="80%";  // comfortable width; change to suit
