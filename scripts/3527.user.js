// ==UserScript==
// @name           4chan /b/ Annoyance Remover
// @author         Malevolyn
// @date           2006-04-01
// @version        0.3
// @namespace      http://www.wegotsgames.com/gmscripts/
// @description    Removes annoying style changes that moot sometimes does to /b/.
// @include        http://img.4chan.org/b/*
// ==/UserScript==

(function()
{
	var stag = document.getElementsByTagName('style');
	var etag = document.getElementsByTagName('embed');

	for (var i=0;i < stag.length;i++)
		stag[i].parentNode.removeChild(stag[i]);

	for (var i=0;i < etag.length;i++)
		etag[i].parentNode.removeChild(etag[i]);
})();
