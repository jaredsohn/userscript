// ==UserScript==
// @name        JVColors
// @namespace   nplay.colors
// @description C'est coloré sur JeuxVideo.com.
// @include     http://www.jeuxvideo.com/forums/1-*
// @include     http://www.jeuxvideo.com/forums/3-*
// @version     1.1
// ==/UserScript==

(function(){

	if(window.localStorage != null) {
		var localStorage = window.localStorage;
	} else if (typeof unsafeWindow !== 'undefined' && unsafeWindow.localStorage != null) {
		var localStorage = unsafeWindow.localStorage;
	}

	var messages = document.querySelectorAll('.pseudo strong');
	
	for(var i in messages) {
		var message = messages[i];
		var pseudo = message.innerHTML.toLowerCase();
		var hexa = Math.floor(Math.random() * (1 << 24)).toString(16);
		
		if(!localStorage[pseudo]) {
			while(hexa.length !== 6) {
				hexa = '0' + hexa;
			}
			localStorage[pseudo] = hexa;
		} else {
			hexa = localStorage[pseudo];
		}
		message.style.color = '#'+hexa;
	}
})();