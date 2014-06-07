// ==UserScript==
// @name           Rainbow Facebook
// @author    	   Avery Tummons
// @namespace      http://img116.imageshack.us/img116/3676/facebookrainbowbn6.jpg
// @description    Makes Facebook rainbow colored
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// ==/UserScript==

GM_addStyle("#header { background:#000000; }");
GM_addStyle("div.profileheader { color:#000000; background:#848484; }");
GM_addStyle("#pageheader { background:url('http://img116.imageshack.us/img116/3676/facebookrainbowbn6.jpg') }");
GM_addStyle("div.profilebox { background:#F0F0FF; }");
GM_addStyle("A:link { color:#000000; }");
GM_addStyle("A:hover { color:#000000; }");
GM_addStyle("A:visited { color:#000000; }");
GM_addStyle(".profileheader h2 {color:#000000;}");
GM_addStyle("input.inputtext {border:1px solid #000000; background:#F0F0FF; color:#000000; }");

