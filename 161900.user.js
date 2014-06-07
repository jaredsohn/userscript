// ==UserScript==
// @name           Twitter: Press Meta+Return send tweet
// @namespace      com.gingerbeardman.userscript.commandreturnsend
// @description    Add keyboard shortcut, Meta+Return, to send tweet
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// @author         Matt Sephton & Ziru
// @version        3
// ==/UserScript==

document.addEventListener('keydown', function(evt) {
	if ((evt.keyIdentifier == 'Enter' || evt.keyCode == evt.DOM_VK_RETURN) && evt.metaKey) {
		if(evt.srcElement.className == "tweet-box rich-editor") { // only submit on a tweet box
			var clickEvent = document.createEvent("MouseEvents");
			clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			evt.target.parentNode.parentNode.querySelector("button.tweet-action").dispatchEvent(clickEvent);
			evt.preventDefault();
		}
		evt.preventDefault(); // Don't insert new line
	}
}, false);