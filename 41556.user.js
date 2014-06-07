// ==UserScript==
// @name           mp3@02ch
// @namespace      http://02ch.su/mu/mp3
// @include        http://02ch.su/mu/*
// @include        http://www.02ch.su/mu/*
// @include        http://02ch.jp/mu/*
// @include        http://www.02ch.jp/mu/*
// ==/UserScript==
//
// Written by anonymous from 2ch.ru software board,
// http://2ch.ru/s/arch/res/16255.html.

// Updated by anonymous from 2ch.ru discussion board,
// http://2ch.ru/d/res/21037.html.

// Updated by anonymous from 02ch.(jp|su) discussion board

for (var xp = document.evaluate('.//div[@class = "nothumb"]', document.getElementById('delform'), null, 6, null), mp3, i = 0; mp3 = xp.snapshotItem(i); i++) {
	var pl = document.createElement('embed');
	with (pl)
		src = 'http://dan.abramov.googlepages.com/mediaplayer.swf', // this one is certainly working
		setAttribute('flashvars', 'type=mp3&file=' + escape(mp3.firstChild.href)),
		width = 320,
		height = 20;
	mp3.parentNode.replaceChild(pl, mp3);
}
