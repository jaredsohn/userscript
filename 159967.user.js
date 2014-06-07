// ==UserScript==
// @id             wiki80width
// @name           Wikipedia: 80em wide with no clutter
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        http://en.wikipedia.org/wiki/*
// @include        https://en.wikipedia.org/wiki/*
// @run-at         document-end
// ==/UserScript==


GM_addStyle("#mw-panel {display:none !important}");
GM_addStyle("body {width: 80em !important; }");
GM_addStyle("#mw-head-base,#header,#content,#footer {margin-left: 2.5em !important}");
GM_addStyle("#mw-head { width: 80em !important; left: 0 !important }");
GM_addStyle("#mw-head > #left-navigation { left: 2.5em !important }");