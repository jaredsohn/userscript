// ==UserScript==
// @name           reddit - filetypes
// @namespace      net.jfred.reddit
// @description    Add ext to certain links
// @include        http://*reddit.com/*
// ==/UserScript==
window.addEventListener('load', function() {
	for (var i = 0, link = null; link = document.links[i]; i++){
		if (ext=link.href.match(/\.(?:pdf|png|gif|jpg|jpeg|doc|xls)$/i)){
			ext=ext[0].substr(1).toUpperCase();
			link.innerHTML = '[' +ext+ ']' + link.innerHTML;
		}
	}
}, true);