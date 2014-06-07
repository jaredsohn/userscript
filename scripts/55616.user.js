// ==UserScript==
// @name           siiimple redirect
// @namespace      http://d.hatena.ne.jp/bannyan/
// @description    Redirects siiimple.com to it's contents page
// @include        http://www.siiimple.com/*
// @exclude        http://www.siiimple.com/siiimple-blog/*
// @exclude        http://www.siiimple.com/list/*
// @exclude        http://www.siiimple.com/about/*
// @exclude        http://www.siiimple.com/contact/*
// @exclude        http://www.siiimple.com/topics/*
// ==/UserScript==

(function(w) {
	var a = w.document.getElementsByTagName('a');
	for (var i = 0; i < a.length; i++)
	    if (a[i].getAttribute('rel') === 'bookmark') location.href = a[i].href;
	
}) (this.unsafeWindow || this);
