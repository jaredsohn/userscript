// ==UserScript==
// @name            404 Blog Not Found タイトル書き換え
// @namespace       http://stayple.net/project/greasemonkey
// @description    404 Blog Not Foundのタイトルから「404 Blog Not Found: 」の文字を消します。
// @include         http://blog.livedoor.jp/dankogai/archives/*
// @version         0.1
// ==/UserScript==

(function() {
	var clearing = "404 Blog Not Found:";
	if (document.title.indexOf(clearing) > -1 && document.title.length > clearing.length) { 
		document.title = document.title.replace(new RegExp(clearing), "");
	}
	
}());
