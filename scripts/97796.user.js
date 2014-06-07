// ==UserScript==
// @name           steelseries macro
// @namespace      lolwut
// @description    steelseries macro
// @include        *4chan.org*
// ==/UserScript==

var posts = document.getElementsByTagName("blockquote");
var i, link;

for(i = 0; i < 10; i++) {
	link = posts[i].innerHTML.match(/[http://steelseries.com\/10?code=|HTTP://STEELSERIES.COM\/10?CODE=]+[a-zA-Z0-9]{8}/);
	if(!link) { continue; }
	GM_xmlhttpRequest({
		method: "HEAD",
		url: link,
	});
}