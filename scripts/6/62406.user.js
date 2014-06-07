// ==UserScript==
// @name          Bigger Engadget Comments
// @description	  Fixes the tiny font that the new comment system uses.
// @include       http://www.engadget.com/*
// @include       http://mobile.engadget.com/*
// @include       http://hd.engadget.com/*
// ==/UserScript==
style = document.createElement("style");
style.type = "text/css";
style.appendChild(document.createTextNode(".cmt_contents{font-size:10pt;}"));	
document.body.appendChild(style);