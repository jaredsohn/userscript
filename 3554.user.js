// ==UserScript==
// @name          Facebook Red
// @author	  James Pereira
// @namespace     http://www.sawdustbunny.com/
// @description	  Makes Facebook green
// @include       http://facebook.com/*
// @include       http://*.facebook.com/*
// ==/UserScript==

GM_addStyle("#header { background:#FFFFFF; }");
GM_addStyle("div.profileheader { color:#FF0000; background:#FFFFFF; }");
GM_addStyle("#pageheader { background:#FF0000}");
GM_addStyle("div.profilebox { background:#FF0000; }");
GM_addStyle("A:link { color:#FF0000; }");
GM_addStyle("A:hover { color:#FF0000; }");
GM_addStyle("A:visited { color:#2b7849; }");
GM_addStyle(".profileheader h2 {color:#FF0000;}");
GM_addStyle("input.inputtext {border:1px solid #2b7849; background:#FFFFFF; color:#FF0000; }");