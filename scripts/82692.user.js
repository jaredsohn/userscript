// ==UserScript==
// @name           Remove videos bar
// @namespace      http://thexdarksider.ath.cx:8080/
// @description    Remove the annoying YouTube videos bar and the autoplay feature
// @include        http://*.youtube.com/*
// ==/UserScript==
var old_url = window.location.href;
var new_url = old_url.replace ('&playnext=1', '');
if (old_url != new_url)
	window.location.href = new_url;
var quicklist_div = document.getElementById ('quicklist');
var parent_div = quicklist_div.parentNode;
parent_div.removeChild (quicklist_div);
