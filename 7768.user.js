// ==UserScript==
// @name           Purple Facebook
// @author    	   Avery Tummons
// @namespace      http://img65.imageshack.us/img65/7584/facebookpurpleal6.jpg
// @description    Makes Facebook purple
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// ==/UserScript==

GM_addStyle("#header { background:#FF00FF; }");
GM_addStyle("div.profileheader { color:#000000; background:#FF5BFF; }");
GM_addStyle("#pageheader { background:url('http://img65.imageshack.us/img65/7584/facebookpurpleal6.jpg') }");
GM_addStyle("div.profilebox { background:#F0F0FF; }");
GM_addStyle("A:link { color:#A41AA4; }");
GM_addStyle("A:hover { color:#A41AA4; }");
GM_addStyle("A:visited { color:#A41AA4; }");
GM_addStyle(".profileheader h2 {color:#A41AA4;}");
GM_addStyle("input.inputtext {border:1px solid #A41AA4; background:#F0F0FF; color:#A437A4; }");

