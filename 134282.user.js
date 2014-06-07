// ==UserScript==
// @name           Mylist 2 MP3
// @version        0.1
// @namespace      http://blog.livedoor.jp/hirogasa/
// @description    ニコニコ動画のマイリストページに、外部のMP3ダウンロードサービスへのリンクを追加します。
// @include        http://www.nicovideo.jp/mylist/*
// @require        http://res.nimg.jp/js/lib/jquery/jquery-1.3.min.js
// ==/UserScript==
(function(){
	$(document).ready(function(){
		f = function(){
			$(".watch").each(function (i, e) {
				$(e).attr("href").match(/watch\/([a-z0-9]+)/);
				$(e).after("<a style=margin-left:5px;font-size:70% href=http://nicosound.anyap.info/sound/"+RegExp.$1+">にこ☆さうんど</a><a style=margin-left:5px;font-size:70% href=http://www.nicomimi.net/play/"+RegExp.$1+">nicomimi</a>");
  			});
		};
		window.setTimeout(f, 3000);
	});
})();