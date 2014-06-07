// ==UserScript==
// @name	IP.Chat Kick Notice
// @namespace	Makaze
// @include	*
// @grant	none
// @version	1.1.2
// ==/UserScript==

if (document.body.id === 'ipboard_body' && document.getElementById('storage_chatroom') != null) {
	var check = setInterval(function() {
		var chat = document.getElementById('storage_chatroom'),
		latestNotice;
		if (chat.getElementsByClassName('chat-moderator')[0] != null) {
			latestNotice = chat.getElementsByClassName('chat-moderator')[chat.getElementsByClassName('chat-moderator').length - 1].getElementsByTagName('div')[0].textContent.trim();
			if (latestNotice === 'You have been kicked from the chat room') {
				document.title = '[KICKED] ' + document.title;
				clearTimeout(check);
			}
		}
	}, 5000);
}