// ==UserScript==
// @name           Redirect Oshiete goo to Okwave
// @description    Redirects Oshiete goo question pages to okwave.jp
// @author         mirka
// @include        http://oshiete.goo.ne.jp/qa/*
// @namespace      http://jaguchi.com
// @version        1.0
// ==/UserScript==

(function () {
	var q_num = window.location.pathname.match(/(\d+).html/);

	if (q_num) {
		window.location = "http://okwave.jp/qa/q" + q_num[1] + ".html";
	}
})();