// ==UserScript==
// @name           osu! CSS fix
// @namespace      http://localhost/scripts/osu
// @description    Fixes the CSS error in FF3.6
// @include        http://osu.ppy.sh/*
// ==/UserScript==

GM_addStyle("#playstats { float:none; }");
GM_addStyle(".menu { left:170px;top:66px; }");
GM_addStyle("#cse-search-box {margin-top:1px;}");