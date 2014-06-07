// ==UserScript==
// @name          WYborcza rss skip ads
// @description   script to skip ads while opening gazeta.pl articles from rss
// @include       *feedsportal.com/*
// ==/UserScript==

(function() {
        var guzik = document.getElementsByClassName('btn');
	if(guzik[0]) {
		try {
			window.location.replace(guzik[0].href);
		} catch (e) {
			window.location.href = guzik[0].href;
		}
	}
})()
