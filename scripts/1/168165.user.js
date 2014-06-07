// ==UserScript==
// @name           ThePirateBay Hash To Torrent Link
// @description    Converts ThePirateBay torrent info hash to multiple torrent cache site links
// @include        http://thepiratebay.se/torrent/*
// @include        https://thepiratebay.se/torrent/*
// @include        http://thepiratebay.sx/torrent/*
// @include        https://thepiratebay.sx/torrent/*
// ==/UserScript==


function runHashToLink(){
	var dlList = document.getElementsByTagName('dl');
	var i = 0;
	var dlElem = dlList[0].innerHTML;
	var start = dlElem.lastIndexOf('</dd>') + 5;
	var hash = dlElem.substring(start);
	hash = hash.replace(/\s+/g, '');
	if(hash == ''){
		dlElem = dlList[1].innerHTML;
		start = dlElem.lastIndexOf('</dd>') + 5;
		hash = dlElem.substring(start);
		hash = hash.replace(/\s+/g, '');	
	}
	
	var div = document.getElementsByTagName('div');
	for(i = 0; div[i].className != 'download'; i++);
	div = div[i];
		
	var torrentCache = new Array('torrage.com', 'torcache.net', 'zoink.it');
	for(i = 0; i < torrentCache.length; i++){			
		var a = document.createElement('a');			
		a.href = 'http://' + torrentCache[i] + '/torrent/' + hash + '.torrent';
		a.innerHTML = torrentCache[i];
		div.appendChild(a);
	}
	var style = document.createElement('style');
	style.innerHTML = '.download a {margin-right:10px;}';
	div.appendChild(style);
}
window.addEventListener("load", function(e) {
	runHashToLink();
}, false);