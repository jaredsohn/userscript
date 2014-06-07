// ==UserScript==
// @name           Kill Facebook Sponsored
// @author	   http://timpala.com
// @namespace      http://userscripts.org/users/105494
// @description    Removes Sponsored box on FB
// @include        *facebook.com*
// ==/UserScript==

function removeSuggestions() {

	var sugg = document.getElementById('home_sponsor_nile');
	if (sugg && sugg.style.display != 'none') { //Prevents the visibility from being set multiple times unnecessarily
		//GM_log("Removing Facebook Sponsored box");
		sugg.style.display = 'none';
	}
}

document.addEventListener("DOMNodeInserted", removeSuggestions, true);