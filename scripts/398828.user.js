// ==UserScript==
// @name	Favstar to Twitter
// @namespace   https://twitter.com/KyoPeeee
// @description	アイコン、日時の表示部分のリンクを変更
// @include	http://*.favstar.fm/*
// @include	http://favstar.fm/*
// @version	1.0
// @grant	none
// ==/UserScript==
(function () {
    var link = document.querySelectorAll('a.fs-date,a.fs-48.fs-avatar');
    for (var i = 0; i < link.length; i++) {
        link[i].href = link[i].href.replace('http://ja.favstar.fm/users/', 'https://twitter.com/');
    }
}) ();
