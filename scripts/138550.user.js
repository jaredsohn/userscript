// ==UserScript==
// @name	Animes-Torrents fixup
// @description	widen animes-bg.com's torrent site
// @include	http://torrents.animes-bg.com/*
// ==/UserScript==


	var logo = document.getElementsByTagName('table');
	logo[1].setAttribute('width', "100%");