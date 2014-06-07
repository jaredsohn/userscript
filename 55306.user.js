// ==UserScript==
// @name           Viimeistä edellisten sivujen linkit MuroBBS:ään
// @namespace      fi.plaza.murobbs.lol
// @include        http://murobbs.plaza.fi/*
// ==/UserScript==

window.addEventListener('load', function() {
	var links = document.getElementsByTagName('a');

	for (var i = links.length - 1; i >= 0; i--) {
		var link = links[i];

		if (link.textContent != 'Viimeinen sivu')
			continue;

		var match = /(\d+)\.html$/.exec(link.href);

		if (!match)
			continue;

		var pageCount = parseInt(match[1]);

		for (var j = Math.max(pageCount - 3, 4); j < pageCount; j++) {
			var pageLink = document.createElement('a');

			pageLink.href = link.href.replace(/\d+\.html$/, j + '.html');
			pageLink.appendChild(document.createTextNode(j));

			link.parentNode.insertBefore(pageLink, link);
			link.parentNode.insertBefore(document.createTextNode(' '), link);
		}
	}
}, false);