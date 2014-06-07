// ==UserScript==
// @id             TreZzoR force current tab
// @name           TreZzoR: force open links in current tab
// @version        1.0
// @description    TreZzoR: force open internal links in current tab
// @include        http://tracker.czech-server.com/*
// @include        https://tracker.czech-server.com/*
// @run-at         document-end
// ==/UserScript==

var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; ++i) {
	if (links[i].hasAttribute("href")){
		if (links[i].getAttribute("href").indexOf("http") != 0) {
			links[i].removeAttribute("target");
			links[i].removeAttribute("onclick");
		}
	}
}
