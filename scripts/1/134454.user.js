// ==UserScript==
// @name         Nicovideo Community's Video Redirecter
// @version      0.1
// @namespace    http://blog.livedoor.jp/hirogasa/
// @description  ニコニコ動画のコミュニティ動画から通常の動画ページに自動でリダイレクトします。
// @include      http://www.nicovideo.jp/watch/*
// ==/UserScript==
(function() {
	if(document.body.innerHTML.match(/<a href="watch\/([^"]+)">元の動画を見る/)){
		location.href = "http://www.nicovideo.jp/watch/" + RegExp.$1;
	}
})();