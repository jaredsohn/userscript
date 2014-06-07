// ==UserScript==
// @name           LD News Without Topics Page
// @namespace      http://d.hatena.ne.jp/bannyan/
// @description    Livedoor News のコンテンツへ直接飛ぶ
// @include        http://news.livedoor.com/*
// ==/UserScript==

(function () {
	if (location.href.match(/http:\/\/news.livedoor.com\/topics\/detail\//)) {
		location.href = 'http://news.livedoor.com/article/detail/' + location.href.match(/\d+/) + '/';
	}
})();
