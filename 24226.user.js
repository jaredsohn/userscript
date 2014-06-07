// ==UserScript==
// @name           Change IMDB Links' Text to the Movies' Title
// @namespace      http://userscripts.org/users/33073/scripts
// @description    With this script, you can see to which movie an imdb link refers to without clicking it.
// @include        *
// @exclude        http://*.imdb.com/*
// @exclude        http://imdb.com/*
// ==/UserScript==


var links = document.getElementsByTagName("a");
for (var i=0; i<links.length; i++) {
	if (links[i].href.match(/imdb\.com\/title\//gi) && links[i].innerHTML.indexOf("<img") > -1) {
		if (!GM_getValue(links[i].href)) {
			GM_xmlhttpRequest({
				method: "GET",
				url: links[i].href,
				onload: rs(i)
			});
		} else {
			links[i].innerHTML = GM_getValue(links[i].href);
		}
	}
}

function rs(i) {
	return function(e) {
		var title = e.responseText.split("<title>")[1].split("</title>")[0];
		links[i].innerHTML = title;
		GM_setValue(links[i].href, title);
	};
}