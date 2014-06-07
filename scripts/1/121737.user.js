// ==UserScript==
// @name		IGM Chat improver
// @namespace		IGM
// @icon		http://dy5oyikz6c23y.cloudfront.net/V005/1/templates/igmaraudersglobal/favicon.ico
// @description		Slightly improvements for IGM chat
// @author		Kleho
// @version		0.1.2
// @date		2012-01-03
// @include		http://igmarauders.isotx.com/*
// ==/UserScript==

var size = 300;
function chat_open() {
	document.getElementById('webchat').style.height = size+'px';
	document.getElementById('chat_bg').style.height = size-25+'px';
	document.getElementById('chat_content').style.height = size-50+'px';
}
function chat_close() {
	document.getElementById('webchat').style.height = '';
	document.getElementById('chat_bg').style.height = '';
	document.getElementById('chat_content').style.height = '';
}

if (/http:\/\/igmarauders.isotx.com\//.test(window.location.href)){

	// Open chat if it need
	var ca = document.cookie.split(';');
	for (var i=0; i<ca.length; i++) {
		if (ca[i].indexOf("chatRoomName=") != -1) {
			if (ca[i].indexOf("/rooms") == -1) {
				chat_open();
			}
			break;
		}
	}

	// Add listener to block
	// Can't add listener to <li> becouse it reloading every several seconds
	document.getElementById("chat_rooms").addEventListener('click', function(){chat_open()}, 1);

	// Add listener to button "exit from chat"
	var items = document.getElementById("chat_minibuttons").getElementsByTagName('span');
	for (var i=0; i<items.length; i++) {
		if (items[i].className == 'close') {
			items[i].addEventListener('click', function(){chat_close()}, 1);
			break;
		}
	}


}
