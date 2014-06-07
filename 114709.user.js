// ==UserScript==
// @name           Cleverbot - Auto Conversation
// @namespace      cleverbot-auto-conversation
// @description    Make Cleverbot have a conversation with itself
// @include        http://cleverbot.com/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
//

jQuery(document).ready(function($) {
	setInterval(function() {
		$("#pass").click();
	}, 2000);
});
