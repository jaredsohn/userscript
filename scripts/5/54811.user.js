// ==UserScript==
// @name           Newgrounds Chat Script
// @author      --USERUNKNOWN--
// @description    This script is for the newgrounds chat I have programmed. It checks your newgrounds username so that you can log in to newgrounds to log into the chat. Very sophisticated script.
// @include         http://*.newgrounds.com/*
// @include        http://*ngeechat.t35.com/*
// ==/UserScript==

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

alert(readCookie(NG_GG_username));