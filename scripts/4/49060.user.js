// ==UserScript==
// @name           Yahoo News Without Topics Page
// @namespace      http://d.hatena.ne.jp/bannyan/
// @description    Yahoo News のコンテンツへ直接飛ぶ
// @include        http://dailynews.yahoo.co.jp/fc/*
// ==/UserScript==

(function () {
	var h3 = document.getElementsByTagName('h3')[0];
	if (h3 !== undefined) {
	    location.href = h3.childNodes[0].href;
	}
})();