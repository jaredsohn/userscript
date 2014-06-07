// ==UserScript==
// @name           4Chan Music Remover
// @namespace      4Chan Music Remover
// @description    4Chan Music Remover
// @include        http://boards.4chan.org/*
// ==/UserScript==

(function()
{
	var etag = document.getElementsByTagName('embed');

	for (var i=0;i < etag.length;i++)
		etag[i].parentNode.removeChild(etag[i]);
})();