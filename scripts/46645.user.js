// ==UserScript==
// @name           Kill Facebook Suggestions
// @author		   http://nicinabox.com
// @namespace      http://userscripts.org/users/22300
// @description    Removes suggestions box on facebook
// @include        *facebook.com*
// ==/UserScript==

function removeSuggestions() {

	var sugg = document.getElementById('pymk_hp_box');
	if (sugg && sugg.style.display != 'none') { //Prevents the visibility from being set multiple times unnecessarily
		//GM_log("Removing Facebook Suggestions box");
		sugg.style.display = 'none';
	}
}

document.addEventListener("DOMNodeInserted", removeSuggestions, true);