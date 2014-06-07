// ==UserScript==
// @name           Netspend Banner Removal
// @namespace      © DreamPhreak 2011
// @version        1.3
// @description    Removes the annoying top bar from netspend.com
// @include        *.netspend.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=108675&days=7
// ==/UserScript==

	var nav = document.getElementById("modal_announcements");
	if (nav) {
	    nav.parentNode.removeChild(nav);
	}
	nav = document.getElementById("modal_announcements");
	if (nav) {
	    nav.parentNode.removeChild(nav);
	}
	
// COPYRIGHT 2011 DREAMPHREAK