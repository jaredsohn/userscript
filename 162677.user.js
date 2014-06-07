// ==UserScript==
// @name        My Netflix
// @namespace   http://userscripts.org/users/498057/scripts
// @description Filter Netflix.com
// @include     http://*.netflix.com/*
// @include     https://*.netflix.com/*
// @version     1
// @grant		GM_addStyle
// ==/UserScript==

GM_addStyle('html, body, .opaque-top-bar, .fixedHeaderLayer {background: #468 !important}');
GM_addStyle('#bd {background: #abc !important}');
GM_addStyle('#hd {background: #800 !important}');
GM_addStyle('#qbox {background: #E7E6DB !important}');
GM_addStyle('th {background: #fd8 !important; color: #000 !important}');
GM_addStyle('td {background: #edb !important}');
GM_addStyle('a, td, input.o, em {font-weight:bold !important}');
GM_addStyle('#ft, #footer, .gift {display:none !important}');

//