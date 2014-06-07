// ==UserScript==
// @name           XXXBBS Antispam
// @description    Removes all the spam from XXXBBS
// @include        http://www.xxxbbs.cc/*
// @author         Pirrata
// @version        0.3
// @license        Public Domain
// ==/UserScript==

function removeSpam() {
	var pattern = '(http://www.xxxbbs.cc/go[0-9]?/\\?|http://vvvv.anonymous-link.net/\\?)([^"\']+)';
	var spampattern = '^http://www.mydownloader.net/';
	var links = document.getElementsByTagName('a');
	for (var i=0;i<links.length;i++) {
		var link = links[i];
		if (typeof(link.href) === 'undefined') continue;
		var t;
		if (t=link.href.match(pattern)) {
			link.href = t[2];
		} else if (link.href.match(spampattern)) {
			var post = link;
			for (var j=0;j<9;j++) post = post.parentNode;
			post.style.display = 'none';
		}
	}
}

removeSpam();
