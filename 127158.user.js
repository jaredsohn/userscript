// ==UserScript==
// @name	kill G preview
// @namespace   http://www.atomer.sakuran.ne.jp
// @description Google検索結果のプレビューを殺す
// @include	http://www.google.co.jp/search*
// @include	https://www.google.co.jp/search*
// @include	http://google.co.jp/search*
// @include	https://google.co.jp/search*
// @version	0.1.1
// ==/UserScript==
var loop = 0,
	id = setInterval(function() {
		var a = document.querySelectorAll(".vspib");
		for (var i = 0, len = a.length; i < len; i++) {
			a[i].parentNode.removeChild(a[i]);
			loop = 999;
		}
		if (loop > 10) {
			return clearInterval(id);
		} else {
			loop++;
		}
	}, 100);