// ==UserScript==
// @name           Remove Background Ad and Resize Content
// @namespace      MetalCard
// @description    Script to remove background ads that appear on some tech/game articles and resize the comments, et al back to normal.
// @include        http://www.digg.com/*
// @include        http://digg.com/*
// @version        1.1
// ==/UserScript==

GM_addStyle("body { background:#E5ECF3 none repeat scroll 0 0 !important; }");
var resize=document.styleSheets[7];
resize.deleteRule(1);