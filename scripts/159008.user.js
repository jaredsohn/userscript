// ==UserScript==
// @name           PirateBay torrent file downloader
// @namespace      thepiratebay.se
// @description    Provides direct torrents.thepiratebay.se torrent files
// @include        http://thepiratebay.se/torrent/*
// @include        https://thepiratebay.se/torrent/*
// @include        http://tpb.pirateparty.org.uk/torrent/*
// @include        https://tpb.pirateparty.org.uk/torrent/*
// @include        http://pirateproxy.net/torrent/*
// @include        https://pirateproxy.net/torrent/*
// ==/UserScript==

//props to http://userscripts.org/scripts/show/128413

function generateLink() {
	var parts = window.location.pathname.replace('/torrent/', '').split('/');
	
	var div = document.getElementsByTagName('div');
	for(i = 0; div[i].className != 'download'; i++);
	div = div[i];
	
	var a = document.createElement('a');			
	a.href = 'http://torrents.thepiratebay.se/' + parts[0] + '/' + parts[1] + '.' + parts[0] + '.TPB.torrent';
	a.innerHTML = 'Download';
	div.appendChild(a);
	
	var style = document.createElement('style');
	style.innerHTML = '.download a {margin-right:10px;}';
	div.appendChild(style);
}
window.addEventListener("load", function(e) {
	generateLink();
}, false);
