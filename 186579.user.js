// ==UserScript==
// @name       TagPro chat macros
// @namespace  http://virtuall.info
// @include      http://tagpro-*.koalabeast.com:*
// @include      http://tagpro-*.koalabeast.com
// @copyright  steppin; a sad dude
// @grant unsafeWindow
// ==/UserScript==

var $ = unsafeWindow.$;

$(function () {
	var lastMessage = 0;
	var dropKeyup = null;

	var chat = function(chatMessage) {
		console.log(chatMessage);
		var limit = 500 + 10;
		var now = new Date();
		var timeDiff = now - lastMessage;
		if (timeDiff > limit) {
			unsafeWindow.tagpro.socket.emit("chat", {
				message: chatMessage,
				toAll: 0
			});
			lastMessage = new Date();
		} else if (timeDiff >= 0) {
			setTimeout(chat, limit - timeDiff, chatMessage)
			console.log(' (deferred +' + (limit - timeDiff) + ')');
		}
	}
	
	var dirs = {};
	$.each([
		[[36, 103], ['↖', 'top left']],
		[[38, 104], ['↑', 'top']],
		[[33, 105], ['↗', 'top right']],
		[[37, 100], ['←', 'left']],
		[[12, 101], ['✳', 'middle']],
		[[39, 102], ['→', 'right']],
		[[35, 97], ['↙', 'bottom left']],
		[[40, 98], ['↓', 'bottom']],
		[[34, 99], ['↘', 'bottom right']],
	], function (_, r) {
		dirs[r[0][0]] = dirs[r[0][1]] = r[1];
	});
		
	var acts = {
		111: ['▶', '▷', '◆', 'attack'],
		106: ['■', '□', '◇', 'defend'],
	};
		
	var etc = {
		109: '✘ no',
		107: '✔ yes',
		75: '✔ okay',
		96: '✝ I will die soon',
		110: '◎ tagpro incoming',
		70: '‽ is the base safe?',
		73: '😞 I\'m so sorry!',
		79: '😉 I\'m testing my macros, sorry if I annoy you!'
	}
	
	$(document.body).on('keydown', function (e) { // not document because handler order
		console.log(e.which);
		if (!unsafeWindow.tagpro) {
			console.log('wut?');
			return;
		}
		if (unsafeWindow.tagpro.disableControls) {
			console.log('disabled');
			return;
		}
		var key;
		if (key = dirs[e.which]) {
			var what = 
				(e.altKey && e.ctrlKey && 'rolling bomb powerup') ||
				(e.ctrlKey && e.shiftKey && 'juke juice powerup') ||
				(e.altKey && 'tagpro powerup') ||
				(e.shiftKey && 'our flag carrier') ||
				(e.ctrlKey && 'enemy attackers') ||
				'enemy flag carrier';
			chat(key[0] + ' ' + what + ' @ ' + key[1]);
		}
		else if (key = acts[e.which]) {
			if (e.shiftKey)
				chat(key[1] + ' someone please ' + key[3] + '!')
			else if (e.ctrlKey)
				chat(key[2] + ' enemy does not ' + key[3] + '!');
			else
				chat(key[0] + ' I will ' + key[3]);
		}
		else if (e.which == '69') {
			chat((!e.shiftKey ? '● ' : '○ no ') + 'enemies on base!');
		}
		else if (key = etc[e.which]) {
			chat(key);
		}
		else {
			return; // bubble
		}
		dropKeyup = e.which;
		return false;
	});

	$(document.body).on('keyup', function (e) {
		if (dropKeyup == e.which) {
			dropKeyup = null;
			return false;
		}
	});
	
});