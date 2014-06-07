//
//
// ==UserScript==
// @name          Dirty Tort Links
// @namespace     http://dirty.ru/
// @description   Tort liks script
// @include       http://dirty.ru/*
// @include       http://*.dirty.ru/*
// ==/UserScript==
//

	var vTortAddLinks = document.querySelector('div.header_logout');
	if ( vTortAddLinks )
	{
		vTortAddLinks.innerHTML += " <a href='http://dirty.ru/banned/'>banned</a> <a href='http://music.dirty.ru/'>music</a>";
	}
