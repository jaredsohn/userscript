// ==UserScript==
// @name           Color changing Facebook
// @author    	   Avery Tummons
// @namespace      http://img150.imageshack.us/img150/2055/colorchangekp9.gif
// @description    Makes Facebook change colors
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// ==/UserScript==

GM_addStyle("#header { background:#000000; }");
GM_addStyle("div.profileheader { color:#000000; background:#000000; }");
GM_addStyle("#pageheader { background:url('http://img150.imageshack.us/img150/2055/colorchangekp9.gif') }");
GM_addStyle("div.profilebox { background:#F0F0FF; }");
GM_addStyle("A:link { color:#000000; }");
GM_addStyle("A:hover { color:#000000; }");
GM_addStyle("A:visited { color:#000000; }");
GM_addStyle(".profileheader h2 {color:#000000;}");
GM_addStyle("input.inputtext {border:1px solid #000000; background:#F0F0FF; color:#000000; }");

