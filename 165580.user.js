// ==UserScript==
// @name           ftchinese-full-page
// @namespace     auto-full-page-ftchinese
// @include        http://www.ftchinese.com/*
// ==/UserScript==


var topics = document.getElementsByTagName("a");
var pattern = new RegExp(/全文/);


for (var i = topics.length - 1; i >= 0 ; i --) {
		if (  pattern.test(topics[i].innerText) ) {
			var autoClick =	topics[i]
        }
}

autoClick.click();