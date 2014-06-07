// ==UserScript==
// @name           Perlentaucher content only
// @namespace      -oxo-
// @description    Remove the rigth-handed box
// @include        http://www.perlentaucher.de/feuilletons/*
// @include        http://www.perlentaucher.de/magazinrundschau/*
// ==/UserScript==

GM_addStyle("div.content {background: no-repeat; }");
GM_addStyle("div#outertage_urban_banner, div.col_left, div.col_right, div.header, div.box, div.search, div.navi, div.subnavi, div.footer_books, div.footer { visibility: collapse; }")
GM_addStyle("div.col_middle > div.box { visibility: visible; }")
GM_addStyle("div.col_middle {width: 100%; position: absolute; top: 0px}");

