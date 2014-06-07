// ==UserScript==
// @name        ニコニコ動画のトップページや再生画面にある検索フォームの検索対象を自動的に「タグ」にする。
// @namespace   http://nicoscript.web.fc2.com/
// @description ニコニコ動画のトップページや再生画面にある検索フォームの検索対象を自動的に「タグ」にする。
// @include     http://www.nicovideo.jp/
// @include     http://www.nicovideo.jp/watch/*
// @author      anon
// @version     0.0.1
// ==/UserScript==

f = document.getElementById("head_search_form");
f.action = "/tag";
obj = f.getElementsByTagName("a"); 
obj[0].className = "head_ssw_0";
obj[1].className = "head_ssw_1";
obj[2].className = "head_ssw_0";