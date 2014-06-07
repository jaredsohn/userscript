// ==UserScript==
// @name	TorrentSpy Direct Linker
// @author	Malevolyn
// @date	2006-03-15
// @version	v0.1.4
// @namespace	http://www.wegotsgames.com/gmscripts/
// @description	Turns the little image next to a torrent's text link (little page with an arrow) into a direct download link for the torrent.
// @include	http://ts.searching.com/search.asp?h=&query=*&submit.x=0&submit.y=0
// @include	http://ts.searching.com/search?mode=advanced&h=&query=*&submit=Advanced+Search*
// @include	http://www.torrentspy.com/directory/*
// ==/UserScript==

(function ()
{
	var links = document.links;
	for (var i=0;i<links.length;i++){ if (links[i].href.split('/')[3] == "torrent" && !links[i].text) links[i].setAttribute('href',"http://www.torrentspy.com/download.asp?id="+links[i].href.split('/')[4]); }
})();

