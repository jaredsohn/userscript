// ==UserScript==
// @name           niconama:zeroing
// @version        0.1
// @namespace      http://blog.livedoor.jp/hirogasa/
// @description    ニコニコ動画では原宿バージョンを、ニコニコ生放送ではZeroバージョンを使い分けられるようにします。
// @include        http://live.nicovideo.jp/*
// ==/UserScript==
(function () {
	d = new Date();
	d.setTime(d.getTime() + (30 * 24 * 3600 * 1000));
	e = d.toUTCString();
	document.cookie = "nico_ver=11; expires=" + e + "; path=/watch/;";
}
)();