// ==UserScript==
// @name			Boxoffice Torrent
// @namespace		http://www.ronaldtroyer.com
// @description		Edit box office titles to link to torrent website (default Isohunt)
// @include			http://www.boxofficemojo.com/yearly/chart/*
// ==/UserScript==

//for yearly results
var links = document.getElementsByTagName('a');
for (i=0; i<links.length; i++) {
	var thislink = links[i].innerHTML;
	if (links[i].href.match(/\?id=/)) {
		thislink = thislink.replace(/\<[^\>]*\>/g, ''); // Remove HTML tags
		thislink = thislink.replace(/\[[^\]]*\]/g, ''); // Remove anything within square brackets
		headerText = thislink;
		links[i].href = 'http://isohunt.com/torrents/?ihq=' + headerText;
		links[i].target = '_blank';
	}
}