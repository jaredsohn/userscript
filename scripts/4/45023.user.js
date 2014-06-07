// ==UserScript==
// @name           Engadget sidebar removed
// @author         TomBell
// @namespace      http://userscripts.org/scripts/show/44433
// @description    Removes sidebar from engadget, makes it full width
// @include        http://*.engadget.com/*
// @include       http://engadget.*/*
// @include       http://www.engadget.*/*
// ==/UserScript==

GM_addStyle(
'#content { margin-right:25px !important; }' +
'#subcontent { display:none !important; }'
);