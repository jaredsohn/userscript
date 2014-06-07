// ==UserScript==
// @name          Fix Metsblog Design
// @description	  Fixes Metsblog 2012 redesign clutter, showing only the blog itself
// @include       http://metsblog.com/*
// @include       http://www.metsblog.com/*
// ==/UserScript==

document.styleSheets[0].insertRule("#secondary, #tertiary, .site-header {display:none !important;}",0);