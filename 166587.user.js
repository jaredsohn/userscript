// ==UserScript==
// @name        dailymail suppress femail column
// @namespace   http://userscripts.
// @include     http://www.dailymail.co.uk/*
// @version     1
// @grant       none
// ==/UserScript==

for (var i=0; i<document.getElementsByClassName('femail').length ; i++ ) { var n = document.getElementsByClassName('femail')[i]; console.log (n.tagName + " " + n.style.display); if (n.tagName = "DIV") { n.style.display="none"; n.style.visibility="hidden";}}

for (var i=0; i<document.getElementsByClassName('tvshowbiz').length ; i++ ) { var n = document.getElementsByClassName('tvshowbiz')[i]; console.log (n.tagName + " " + n.style.display); if (n.tagName = "DIV") { n.style.display="none"; n.style.visibility="hidden";}}