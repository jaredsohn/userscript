// ==UserScript==
// @name       Tumblr - Hide Long 'Ask me these!' Posts
// @namespace  https://www.metalmetalland.com
// @require    http://code.jquery.com/jquery-2.0.3.js
// @require    https://www.metalmetalland.com/scripts/waitForKeyElements.js
// @version    1.0
// @description  Hides very long posts in which people beg for hollow gestures of their followers' attention.
// @match      http://www.tumblr.com/*
// @exclude    http://www.tumblr.com/upload/*
// @exclude    http://www.tumblr.com/blog/*
// @exclude    http://www.tumblr.com/new/*
// @exclude    http://www.tumblr.com/inbox/*
// @copyright  2013+, ebol4
// ==/UserScript==
searchForConvos();
waitForKeyElements(".post_container", searchForConvos);

function searchForConvos() {
	console.log("We're searching for convos!");
	$(".post.is_conversation").each(function(i, obj) {
		if ($(this).find(".chat_line").length > 14) {//If there's more than 14 lines in a chat post
			$(this).remove();
			console.log("Annoying post removed!");
		}
	});
}