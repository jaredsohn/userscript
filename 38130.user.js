// ==UserScript==
// @name          Facebook Green
// @author	  James Pereira
// @namespace     http://www.sawdustbunny.com/
// @description	  Makes Facebook green
// @include       http://facebook.com/*
// @include       http://*.facebook.com/*
// ==/UserScript==

GM_addStyle("#header { background:#3b9859; }");
GM_addStyle("div.profileheader { color:#000000; background:#BAE8AA; }");
GM_addStyle("#pageheader { background:url('http://www.sawdustbunny.com/fb_head.jpg') }");
GM_addStyle("div.profilebox { background:#F0F0FF; }");
GM_addStyle("A:link { color:#2b7849; }");
GM_addStyle("A:hover { color:#2b7849; }");
GM_addStyle("A:visited { color:#2b7849; }");
GM_addStyle(".profileheader h2 {color:#2b7849;}");
GM_addStyle("input.inputtext {border:1px solid #2b7849; background:#F0F0FF; color:#3B9859; }");
