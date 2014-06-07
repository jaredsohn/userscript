// ==UserScript==
// @name           Yellow Facebook
// @author    	   Avery Tummons
// @namespace      http://img135.imageshack.us/img135/2630/facebookyellowuz8.jpg
// @description    Makes Facebook yellow
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// ==/UserScript==

GM_addStyle("#header { background:#F6FF00; }");
GM_addStyle("div.profileheader { color:#000000; background:#F6FF00; }");
GM_addStyle("#pageheader { background:url('http://img135.imageshack.us/img135/2630/facebookyellowuz8.jpg') }");
GM_addStyle("div.profilebox { background:#F0F0FF; }");
GM_addStyle("A:link { color:#000000; }");
GM_addStyle("A:hover { color:#000000; }");
GM_addStyle("A:visited { color:#000000; }");
GM_addStyle(".profileheader h2 {color:#000000;}");
GM_addStyle("input.inputtext {border:1px solid #000000; background:#F0F0FF; color:#000000; }");

