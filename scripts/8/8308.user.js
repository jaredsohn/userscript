// ==UserScript==
// @name			Bithumen isohunt search link
// @description		Torrentekhez ad egy isohunt kereso linket
// ==/UserScript==


function convertToSearchString(text)
{
	var result = text.replace(/.torrent/g,'');
	result = result.replace(/^bh_/i,'');
	result = result.replace(/_DVDRip/ig,'');
	result = result.replace(/_DVDR/ig,'');
	result = result.replace(/_PAL/ig,'');
	result = result.replace(/__|-|_-_/g,'_');
	result = result.replace(/_/g,'+');

	return result.toLowerCase();
}

var link = document.evaluate("//a[@class='index']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);

var text = link.innerHTML;

var div = document.createElement('div');

var searchstr = convertToSearchString(text);

div.innerHTML = "<div style='float:right;font-weight:bold;margin-top:10px'><a href='http://isohunt.com/torrents/?ihq="+searchstr+"'>isoHunt<a/>&nbsp;<a href='http://www.mininova.org/search/?search="+searchstr+"'>mininova<a/></div>";

link.parentNode.insertBefore(div, link.nextSibling);

