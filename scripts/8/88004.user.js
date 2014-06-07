// ==UserScript==
// @name	   TPB2torrific
// @description    Add links to thepiratebay browse page for direct torrent adding
// @include        http://thepiratebay.org/browse/*
// @include	   http://thepiratebay.org/search/*
// @include	   http://thepiratebay.org/top/*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==


var all_links = document.getElementsByTagName("a");

for(var i=0;i<all_links.length;i++)
{
	var href = all_links[i].href;
	var hrfd = href.split("/");
	if(hrfd[2]=="torrents.thepiratebay.org")
	{
		//replace download link
		all_links[i].href="http://www.torrific.com/submit/?url=http://torrents.thepiratebay.org/"+hrfd[3]+"/"+hrfd[4];
		all_links[i].target="_blank";
	}
}
