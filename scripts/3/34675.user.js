// ==UserScript==
// @name           youTube link preview
// @namespace      http://userscripts.org/users/33073/scripts
// @description    shows you the video's title on youtube links
// @include        http://*
// @exclude        http://*.youtube.com/*
// @exclude        http://youtube.com/*
// ==/UserScript==

var links = document.evaluate("//a[contains(@href, 'youtube.com/watch?v=')]", document, null, 6, null), i, link, text;
for (i=0; i<links.snapshotLength; i++) {
	link = links.snapshotItem(i);
	GM_xmlhttpRequest({
		method: "get",
		url: link.href,
		onload: function(e) {
			// innerHTML so we get all chars
			link.innerHTML = e.responseText.split("<title")[1].split(">")[1].split("</title")[0].slice(10);
			
		}
	});
}