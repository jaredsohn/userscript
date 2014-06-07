// ==UserScript==
// @name          Subscription Notice Remover
// @namespace     http://userstyles.org
// @description	  Removes all those notices saying "Your deviantART Subscription gives you access to this great module" such when editing and adding modules on your profile page.
// @author        frozenpandaman
// @homepage      http://userstyles.org/styles/14494
// @include       http://deviantart.com/*
// @include       https://deviantart.com/*
// @include       http://*.deviantart.com/*
// @include       https://*.deviantart.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); .has_subscription { display: none; } .zone-party-welcome { display: none; } .zone-party-talktothehand { display: none; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
