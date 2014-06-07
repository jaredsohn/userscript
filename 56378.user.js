// ==UserScript==
// @name           NicoNico Douga Auto Scroll To Video
// @namespace      http://d.hatena.ne.jp/bannyan/
// @description    Automatically scrolls to the title
// @include        http://www.nicovideo.jp/watch/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

(function(w) {
	var offset = $("#WATCHHEADER").offset();
	w.scrollTo(offset.left, offset.top);
}) (this.unsafeWindow || this);
