// ==UserScript==
// @name           Red Facebook
// @author    	   Avery Tummons
// @namespace      http://img402.imageshack.us/img402/2055/facebookredwb8.jpg
// @description    Makes Facebook red
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// ==/UserScript==

GM_addStyle("#header { background:#FF1705; }");
GM_addStyle("div.profileheader { color:#000000; background:#BB3131; }");
GM_addStyle("#pageheader { background:url('http://img402.imageshack.us/img402/2055/facebookredwb8.jpg') }");
GM_addStyle("div.profilebox { background:#F0F0FF; }");
GM_addStyle("A:link { color:#C51313; }");
GM_addStyle("A:hover { color:#C51313; }");
GM_addStyle("A:visited { color:#C51313; }");
GM_addStyle(".profileheader h2 {color:#C51313;}");
GM_addStyle("input.inputtext {border:1px solid #C51313; background:#F0F0FF; color:#CB0505; }");

