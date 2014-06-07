// ==UserScript==
// @name          Gmail Chat Inline Status
// @version       0.2
// @description   Inline-display name and status of Gmail chat buddies.
// @author 	      @fisio
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==
(function() {
	var css = '@namespace url(http://www.w3.org/1999/xhtml);.vI{float:left;}.vm{display:inline;line-height:19px;}.vG{padding-left:0.3em;}';
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
})();






