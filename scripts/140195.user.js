// ==UserScript==
// @name           twipple photo - direct link
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://p.twipple.jp/user/*
// @version        1.0
// ==/UserScript==

Array.prototype.forEach.call(document.querySelectorAll('.simple_list_photo > a, .photoFrame > a'), function(e) {
	e.href = e.href.replace(/p\.twipple\.jp\//, 'p.twpl.jp/show/orig/');
});