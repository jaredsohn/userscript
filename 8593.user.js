// ==UserScript==
// @name          Facebook Tech
// @author	  Sav Joy
// @description	  Makes Facebook red and blue
// @include       http://facebook.com/*
// @include       http://*.facebook.com/*
// ==/UserScript==

GM_addStyle("#header { background:# FF0000; }");
GM_addStyle("div.profileheader { color:#0000CC; background:#FF0000; }"); 
GM_addStyle("#pageheader { background:url(' http://ir.latech.edu/coppermine/albums/campus/tulips2004-3.jpg') }");
GM_addStyle("div.profilebox { background:# 0000CC; }");
GM_addStyle("A:link { color:# FF0000; }");
GM_addStyle("A:hover { color:# FF0000; }");
GM_addStyle("A:visited { color:# FF0000; }");
GM_addStyle(".profileheader h2 {color:# FF0000;}");
GM_addStyle("input.inputtext {border:1px solid # FF0000; background:#0000CC; color:# FF0000; }");
