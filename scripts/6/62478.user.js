// ==UserScript==
// @name          Blue Engadget Comments
// @description	  Don't settle for the little "Highest Ranked" ribbon, make the whole comment blue.
// @include       http://www.engadget.com/*
// @include       http://mobile.engadget.com/*
// @include       http://hd.engadget.com/*
// ==/UserScript==
style = document.createElement("style");
style.type = "text/css";
style.appendChild(document.createTextNode(".level4{background:#d8f0f8;}#comments .comment_entry.child.level4{background:#d8f0f8;}"));	
document.body.appendChild(style);