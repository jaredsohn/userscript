// ==UserScript==
// @name           Feedly Clean for Title View
// @namespace      http://userscripts.org/scripts/show/162006
// @description    A basic Feedly cleanup
// @include        http://www.feedly.com/*
// @version        1.1
// ==/UserScript==

var css = ''; // declare variable

/* condensing parts of feedly, best viewed in Titled view */
css += "#feedlyFrame { width: 98% !important; }";
css += "#feedlyPart { width: 98% !important; }";
css += "#feedlyPage { width: 98% !important; }";
css += "#mainArea { width: 98% !important; }";
css += ".inlineFrame {padding: 10px !important;}";
css += ".condensed {padding: 10px !important;}";
css += "h2 {margin-top: 2px !important; margin-bottom: 2px !important;}";

GM_addStyle(css);