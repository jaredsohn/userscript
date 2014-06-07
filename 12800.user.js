// ==UserScript==
// @name           IMDB 2 NewzBin
// @namespace      imdb2nzb
// @description    Convert a link on IMDB to a NewzBin link.
// @include        http://*.imdb.com/*
// ==/UserScript==

function GetTopLinks() {
	els = document.getElementsByTagName("a");
	for (i = 0; i < els.length; i++) {
		var el = els[i];
		if (el.hasAttribute('class')) {
			if (el.getAttribute('class') == "link") return el;
		}
	}
  return null;
}

var nblink = GetTopLinks();

var re = /\/title\/(tt\d+)\//;
var m = re.exec(nblink.href);

if (m) { 
	dv = nblink.cloneNode(false);
  dv.href = 'http://v3.newzbin.com/search/?searchaction=Search&&category=6&q_url=%2Ftitle%2F'+m[1];
  dv.innerHTML = 'NewzBin';
  nblink.parentNode.insertBefore(dv,nblink);
}
