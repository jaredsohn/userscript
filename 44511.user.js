// ==UserScript==
// @name           Fark sidebar removed
// @author         TomBell
// @namespace      http://userscripts.org/scripts/show/44433
// @description    Removes sidebar from fark, makes it full width
// @include        http://*.fark.com/*
// @include       http://fark.*/*
// @include       http://www.fark.*/*
// ==/UserScript==

GM_addStyle(
'#bodyRightSideContainer { display:none !important; }' +
'#bodyHeadlineContainer { margin:0 0 15px 0 !important; }'
);