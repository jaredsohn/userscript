// ==UserScript==
// @name          Anti-AW
// @namespace     http://www.jeuxvideo.com/anti-aw
// @description   Bloque la plupart des attention-whores du 15-18.
// @include       http://www.jeuxvideo.com/*
// @include       http://www1.jeuxvideo.com/*
// @include       http://193.36.45.139/*
// @include       http://193.36.45.149/*
// @version       1.0
// ==/UserScript==

var aw = ['Cassie',
          'LMFcuuty',
          'LizzieMcGuire',
          'Poussin-Rose',
          'ElodieLaRiche',
          'Soucieuse',
          'Reeiko',
          'Villi-',
          'VilIi',
          'Dramatisme',
          'GreenFramboise',
          '-Lau'];

var topics = document.getElementById('liste_topics');

if(topics !== null) {
	topics = topics.getElementsByTagName('tr');
	
	for(var i = 0, len = topics.length; i < len; i++) {
		var pseudo = topics[i].getElementsByClassName('pseudo');
		
		if(pseudo.length > 0) {
			pseudo = pseudo[0].innerHTML.toLowerCase();
			
			for(var j = 0; j < aw.length; j++) {
				if(pseudo === aw[j].toLowerCase()) {
					topics[i].style.display = 'none';
					break;
				}
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
			console.log(pseudo);
			
			for(var j = 0; j < aw.length; j++) {
				if(pseudo === aw[j].toLowerCase()) {
					messages[i].style.display = 'none';
					break;
				}
			}
		}
	}
}
