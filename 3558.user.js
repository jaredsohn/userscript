// ==UserScript==
// @name          Facebook Red
// @author	  James Pereira
// @namespace     http://www.sawdustbunny.com/
// @description	  Makes Facebook green
// @include       http://facebook.com/*
// @include       http://*.facebook.com/*
// ==/UserScript==

GM_addStyle("#header { background:#FFFFFF; }");
GM_addStyle("div.profileheader { color:#FF0000; background:#BAE8AA; }");
GM_addStyle("#pageheader { background:#FF0000 }");
GM_addStyle("div.profilebox { background:#FF0000; }");
GM_addStyle("A:link { color:#2b7849; }");
GM_addStyle("A:hover { color:#2b7849; }");
GM_addStyle("A:visited { color:#2b7849; }");
GM_addStyle(".profileheader h2 {color:#2b7849;}");
GM_addStyle("input.inputtext {border:1px solid #2b7849; background:#FF0000; color:#3B9859; }");