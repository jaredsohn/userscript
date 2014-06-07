// ==UserScript==
// @name          Last.Metal Archives
// @description   links from last.fm to metal-archives
// @include       http://www.last.fm/music/*
// @exclude       http://www.last.fm/music/*/*
// ==/UserScript==

function addLinks() {
	var prefix = 'http://www.last.fm/music/';
	var band = window.location.href.substr(prefix.length)
	var h1 = document.getElementsByTagName('h1');
	var link = '';
	link += '<a style="font-weight: normal; padding-left: 4px; padding-right: 6px; font-size: 8pt;" target="_blank" href="http://www.google.com/search?sitesearch=metal-archives.com&btnI=1&q=' + band + '">';
	link += 	'<br>metal archives';
	link += '</a>';
	h1[0].innerHTML += '&nbsp;' + link;
}

window.addEventListener("load",function(){addLinks();},false);
