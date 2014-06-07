// ==UserScript==
// @name           toggetter read more
// @namespace      http://smbd.jp/
// @description    togetterで「残りを読む」を自動でクリックする
// @include        http://togetter.com/li/*
// @version        0.4
// ==/UserScript==

var idprefix = "more_tweet_box_";
var idx = 2;
var interval = 5000;

window.addEventListener('load', function() {
	var tid    = document.URL.match(/http:\/\/togetter\.com\/li\/(\d+)/)[1];
	var xpath  = '//div[@id="'+ idprefix + tid + '"]/a';
	var btnstr   = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).textContent;
	var remain = Number(btnstr.match(/残りを読む\((\d+)\)/)[1]);
	var times  = Math.floor(remain/250);

	for (var i = 0; i <= times; i++) {
		var j = 0;
		setTimeout(function() {
			unsafeWindow.tgtr.moreTweets(tid, j+idx);
			j++;
		}, interval*i);
	}
}, false);