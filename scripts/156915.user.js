// ==UserScript==
// @name        Google検索 日本語のみボタン
// @namespace   http://0-oo.net/
// @description Google検索に「日本語のみ」ボタンを追加する
// @homepage    http://0-oo.net/log/category/greasemonkey/
// @version     0.1.1
// @include     http*://www.google.tld/search*
// @include     http*://www.google.tld/webhp*
// @include     http*://www.google.tld/#*
// @include     http*://www.google.tld/
// ==/UserScript==
//
// ( The MIT License )
//
(function(){
	var btn = document.body.appendChild(document.createElement("img"));
	btn.src = "https://chart.googleapis.com/chart?chst=d_simple_text_icon_above&chld=|0|000|flag_ja|24|000|000";
	btn.title = "日本語のページを検索";

	btn.style.position = "absolute";
	btn.style.top = "108px";
	btn.style.right = "120px";
	btn.style.zIndex = 1000;
	btn.style.border = "solid 1px #ccc";
	btn.style.cursor = "pointer";
	
	btn.addEventListener("click", function() {
		location.href = location.href + "&lr=lang_ja";
	}, false);
})();
