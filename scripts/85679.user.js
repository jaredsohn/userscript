// ==UserScript==
// @name           No Names 4chan
// @namespace      SuperRicardoWorld
// @description    
// @include        http://boards.4chan.org/*
// @include        http://boards.4chan.org/*/res/*
// ==/UserScript==


var blockq, spans, randno, postid;
blockq = document.getElementsByTagName('blockquote');
spans = document.getElementsByTagName('span');


for (var i = 0; i < spans.length; i++) {
	if (spans[i].className == 'commentpostername' || spans[i].className == 'postertrip' || spans[i].className == 'postername') {
		spans[i].style.display = 'none';
	}
}