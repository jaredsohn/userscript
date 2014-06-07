// ==UserScript==
// @name           Selectable lyrics on Pandora
// @namespace      tag:brainonfire.net,2009-12-14:pandora-selectable-lyrics
// @description    Make the lyrics selectable on Pandora song pages.
// @include        http://www.pandora.com/music/song/*
// @version        0.1
// @license        GPL
// @changelog      First version
// ==/UserScript==

function kill(el) {
	el.parentNode.removeChild(el);
}

function swapOut() {
	var lyrics = document.getElementById('fullLyrics'); // get real lyrics block
	var simple = document.createElement('pre');
	simple.innerHTML = lyrics.innerHTML;
	lyrics.parentNode.insertBefore(simple, lyrics);
	kill(lyrics);
	simple.id = 'fullLyrics';
	
	kill(document.getElementById('lyricSnippet'));
	kill(document.getElementById('lyricSnippetClean'));
}

function delay(f, mil) {
	return function() {
		setTimeout(f, mil);
	}
}

function getOneEvent(el, type, callback, isCapture) {
	function once() {
		el.removeEventListener(type, once, isCapture);
		callback();
	}
	el.addEventListener(type, once, isCapture);
}

var lyricsPlaceholder = document.getElementById('fullLyrics');
if(lyricsPlaceholder) {
	getOneEvent(lyricsPlaceholder, 'DOMSubtreeModified', delay(swapOut, 100), false);
}

