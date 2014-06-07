// ==UserScript==
// @name           KillXiaoi
// @namespace      tealeaf.net
// @description    Remove Xiaoi Link Head
// @include        http://z.xiaoi.com/*
// ==/UserScript==
(function() {
 	var link = decodeURIComponent(location.href);
 	link = link.replace(/http\:\/\/z\.xiaoi\.com\/r\?\$/, "https://");
 	link = link.replace(/http\:\/\/z\.xiaoi\.com\/r\?/, "http://");
	location.href = link;
})();
