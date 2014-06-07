// ==UserScript==
// @name        Shunga Release
// @namespace   http://www.atomer.sakura.ne.jp
// @description 伏せられている春画画像を解き放ちます
// @include     http://seiga.nicovideo.jp/seiga/*
// @version     0.1
// ==/UserScript==

var s,
	a = document.querySelectorAll(".other_illust .center_img_inner img") || [];

for (var i = 0, len = a.length; i < len; i++) {
	s = a[i].src;
	s = s.replace(/^(.+)\/(\d+)z.*$/, "$1/$2q");
	a[i].src = s;
}