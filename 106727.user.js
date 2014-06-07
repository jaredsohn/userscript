// ==UserScript==
// @name           hatebu read mode
// @namespace      http://smbd.jp/
// @description    はてブで「すべてのブックマークを見る」をクリックする
// @include        http://b.hatena.ne.jp/entry/*
// @version        0.1
// ==/UserScript==

var xpath = '//p[@id="more-link"]/a/@href';

window.addEventListener('load', function() {
	var path = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).textContent;
	window.location.href = "http://" + document.domain + path;
}, false);