// ==UserScript==
// @name           ynet
// @namespace      ynet
// @include        http://www.ynet.co.il/articles/*
// ==/UserScript==

if (unsafeWindow.stlkbc) {
	unsafeWindow.stlkbc.onClickSetModeAsc();
}