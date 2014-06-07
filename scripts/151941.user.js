// ==UserScript==
// @name        Chat Improve
// @namespace   ikariamscript.webege.com
// @description Migliora la Chat
// @include     http://s*.*.ikariam.com/*
// @grant       unsafeWindow
// @grant       GM_addStyle
// @version     0.3.5
// @downloadURL https://userscripts.org/scripts/source/151941.user.js
// @updateURL   https://userscripts.org/scripts/source/151941.meta.js
// @icon        http://ikariamscript.webege.com/icon/151941.png
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
window.addEventListener('load', function(e) {
	var o = 5000;
	var u = null;
	var s = 0;

	var init = function(c) {
		if(!window.localStorage.getItem('ownerName') && unsafeWindow.dataSetForView.backgroundView == 'city') {
			window.localStorage.setItem('ownerName', unsafeWindow.ikariam.backgroundView.screen.data.ownerName)
		}
		makeAudio('chat', 'http://ikariamscript.webege.com/sound/ding.ogg');
		o = c;
		poll();
	};
	var close = function() {
		clearTimeout(u);
	};
	var poll = function() {
		var b = 'id=' + s;
		unsafeWindow.ajaxRequest('?action=ChatWindow&function=poll', handleResponse, b);
		clearTimeout(u);
		u = setTimeout(poll, o);
	};
	var insert = function(c) {
		var result = false;
		for(var e = 0; e < c.length; e++) {
			s = c[e][0];
			if( (s > window.localStorage.getItem('chattime')) && (c[e][2] != window.localStorage.getItem('ownerName')) ) {
				result = true;
				window.localStorage.setItem('chattime', s);
			}
		}
		return result;
	};
	var handleResponse = function(b) {
		var newmsg = false;
		
		if(b == "") {
			return;
		}
		try {
			b = JSON.parse(b);
		} catch(c) {
			clearTimeout(u);
			return;
		}
		for(var e = 1; e < b.length; e++) {
			switch(b[e][0]) {
				case 'insert':
					newmsg = insert(b[e][1]);
					activated(newmsg);
					break;
				default:
					break;
			}
		}
	};
	var activated = function(bool) {
		if(bool) {
			unsafeWindow.$('#js_viewChat a').each(function() {
				unsafeWindow.$(this).addClass('activated');
				playAudio('chat');
			});
		}
	}
	
	var makeAudio = function(id, src) {
		var audio = document.createElement('audio');
		audio.setAttribute('id', id + '_audio');
		audio.setAttribute('preload', 'auto');
		audio.setAttribute('autobuffer', '');
	
		var source = document.createElement('source');
		source.setAttribute('src', src);
		source.setAttribute('type', 'audio/x-wav');
	
		audio.appendChild(source);
		document.getElementById('header').appendChild(audio);
	}
	var playAudio = function(id) {
		if(!!(document.createElement('audio').canPlayType)) {
			document.getElementById(id + '_audio').play();
		}
	}

	unsafeWindow.$('#js_viewChat a').each(function() {
		unsafeWindow.$(this).click(function() {
			unsafeWindow.$(this).removeClass('activated');
		});
	});
	init(unsafeWindow.ikariam.model.chatPollFrequency * 5);
	GM_addStyle("#container .popup_window .popup_contentbox { padding: 0; }");
}, false);