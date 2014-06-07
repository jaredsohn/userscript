// ==UserScript==
// @name          JV Adblock
// @namespace     http://www.jeuxvideo.com/jvadblock
// @description   Bloquer les pubs intégrées aux forums de Jeuxvideo.com.
// @include       http://ww.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/*
// @include       http://www1.jeuxvideo.com/*
// @include       http://193.36.45.139/*
// @include       http://193.36.45.149/*
// @version       1.0
// ==/UserScript==

var topics = document.getElementById('liste_topics').getElementsByTagName('tr');

for(var i = 0, len = topics.length; i < len; i++) {
	var ltopic = topics[i].getElementsByClassName('ltopic');
	
	if(ltopic.length > 0) {
		if(ltopic[0].innerHTML.toLowerCase().indexOf('4l') > -1) {
			topics[i].style.display = 'none';
			continue;
		}
	}
	
	var pseudo = topics[i].getElementsByClassName('pseudo');
	
	if(pseudo.length > 0) {
		if(pseudo[0].innerHTML.toLowerCase() === 'mclex') {
			topics[i].style.display = 'none';
			continue;
		}
	}
}