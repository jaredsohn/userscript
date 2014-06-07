// ==UserScript==
// @name           Google Reader -- Compact Collapsed Article Titles
// @description    Google Reader now enables a more compact style -- this makes the collapsed article list even more compact
// @namespace      http://triadic.com
// @include        http*://www.google.*/reader/view/*
// ==/UserScript==

GM_addStyle("#entries.list .entry .collapsed                   { padding:0px 0px 0px 0px !important;}");
GM_addStyle("#entries.list .entry .collapsed                   { height:20px !important;}");
GM_addStyle("#entries.list .collapsed .entry-secondary         { line-height:18px !important;}");
GM_addStyle("#entries.list .collapsed .entry-title             { line-height:18px !important;}");
GM_addStyle("#entries.list .collapsed .entry-date              { line-height:18px !important;}");
GM_addStyle(".scroll-tree li.sub                               { height:18px !important;}");