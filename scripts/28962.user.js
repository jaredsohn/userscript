// ==UserScript==
// @name           Mingpao HKSCS
// @namespace      thinkpandapanda
// @include        http://www.mingpaonews.com/*
// ==/UserScript==

var m = document.getElementsByTagName("meta")
if (m) {
	m.content="text/html; charset=big5_hkscs";
	alert("m is found");
}