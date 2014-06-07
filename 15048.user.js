// ==UserScript==
// @name            ニコニコ動画 タイトル書き換え(タブブラウザ用)
// @namespace       http://stayple.net/project/greasemonkey
// @description    ニコニコ動画のWebページタイトルを変更します。トップページは「ニコ」に変更し，その他は「ニコニコ動画(*)-」の表示を消します。タブブラウザを利用していると，タブ毎のサイト名表示が邪魔でコンテンツを確認できない問題があるので，それの解決のために作りました。サイトの区別については，favicon表示で補ってください。
// @include         http://www.nicovideo.jp/*
// @version         0.1
// ==/UserScript==

(function() {
	if(document.title.indexOf("ニコニコ動画") > -1 ) { 
		if (document.title.indexOf("‐") > -1) {
			document.title = document.title.split("‐")[1];
		} else {
			document.title = "ニコ";
		}
	}
}());
