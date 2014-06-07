// ==UserScript==
// @name        Anti-CohenLeBanquier
// @namespace   http://something/somewhere/someresource
// @include     http://www.jeuxvideo.com/forums/*
// @version     1
// ==/UserScript==

var topics = document.getElementById('liste_topics');

if(topics !== null) {
	topics = topics.getElementsByTagName('tr');
	
	for(var i = 0, len = topics.length; i < len; i++) {
		var pseudo = topics[i].getElementsByClassName('pseudo');
		
		if(pseudo.length > 0) {
			pseudo = pseudo[0].innerHTML.toLowerCase();
			if (pseudo.indexOf('cohen') != -1) {
				topics[i].style.display = 'none';
			}
		}
	}
}

var messages = document.getElementsByClassName('msg');

if(messages !== null) {
	for(var i = 0, len = messages.length; i < len; i++) {
		var pseudo = messages[i].getElementsByClassName('pseudo');
		
		if(pseudo.length > 0) {
			pseudo = pseudo[0].getElementsByTagName('strong')[0].innerHTML.toLowerCase();
			
			if (pseudo.indexOf('cohen') != -1) {
				messages[i].style.display = 'none';
			}
		}
	}
}