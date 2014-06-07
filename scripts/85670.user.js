// ==UserScript==
// @name           Row Row Fight The Powa! Muted Version 4chan
// @namespace      SuperRicardoWorld
// @include        http://boards.4chan.org/*
// ==/UserScript==

var firstcont, spans, blockq, fileTitles, pageTitle;
firstcont = document.body.lastChild;
spans = document.getElementsByTagName('span');
blockq = document.getElementsByTagName('blockquote');
fileTitles = document.getElementsByClassName('filetitle');
pageTitle = document.getElementsByClassName('logo');

pageTitle[0].getElementsByTagName('font')[0].innerHTML =  '<b><SPAN>positron uprising</SPAN></b>';
pageTitle[0].getElementsByTagName('font')[1].innerHTML =  'i for one welcome our new <del>proton</del> spiral overlords<br />ROW ROW FIGHT THE POWAH';


for (var i = 0; i < spans.length; i++) {
	if (spans[i].className == 'commentpostername' || spans[i].className == 'postername') {
		if (spans[i].innerHTML == 'Anonymous') {
			spans[i].innerHTML = 'Anonymous';
			}
		else {
			spans[i].innerHTML = 'ROW ROW FIGHT THE POWAH';
		}
	}
}

for (var i = 0; i < blockq.length; i++) {
	blockq[i].innerHTML = 'ROW ROW FIGHT THE POWAH';	
}

for (var i = 0; i < fileTitles.length; i++) {
	if (fileTitles[i].innerHTML) {
		fileTitles[i].innerHTML = 'ROW ROW FIGHT THE POWAH';	
	}
}

;









